const FAILED_REDIRECT = 'contact/failed/';
const CONFIRMATION_REDIRECT = 'contact/thank-you/';

export default defineEventHandler(async (event) => {
  const honeypotFieldName = 'url-page';
  const config = useRuntimeConfig(event);
  const body = await readBody(event);

  const { name, email, consent, locale } = body;

  if (!name || !email || body[honeypotFieldName]) {
    console.error(
      'Encountered filled-in honey-pot',
      { [honeypotFieldName]: body['honeypotFieldName'] }
    );
    return sendRedirect(event, `/${locale}/${FAILED_REDIRECT}`);
  }
  await subscribe(
    { name, email, consent },
    { api_token: config.pipedriveApiToken, url: config.pipedriveApiUrl }
  )
    .then(() => {
      return sendRedirect(event, `/${locale}/${CONFIRMATION_REDIRECT}`, 303);
    })
    .catch((error) => {
      console.error(
        'Error subscribing user',
        error
      );
      return sendRedirect(event, `/${locale}/${FAILED_REDIRECT}`);
    });
});

type PersonFieldData = {
  id: number;
  key: string;
  name: string;
  options: {
    label: string;
    id: number;
  }[];
};

/**
 * Below naming conventions should NOT be changed in Pipedrive.
 * It is a bit of a hassle, but PipeDrive ids and keys cannot be adjusted.
 */
const CONTACT_SOURCE_IDENTIFIER = "contact source";
const WEBSITE_OPTION_IDENTIFIER = "newsletter";

/**
 * Fetches all person fields from Pipedrive and extracts the key for the 'Contact Source' field
 * and the option id for 'Newsletter (Website)'.
 * PipeDrive ids and keys cannot be adjusted hence the need to first GET all the fields.
 *
 * @param params - Object containing the Pipedrive API token and base URL
 * @returns An object with the Contact Source field key and the Newsletter (Website) option id, or empty object if info cannot be found
 */
async function getContactSourceFieldInfo({
  api_token,
  url,
}: {
  api_token: string;
  url: string;
}): Promise<{ [key: string] : number }> {
  const params = new URLSearchParams({ api_token });
  const result: { success: boolean; data: PersonFieldData[] } = await fetch(
    new URL(`${url}/v1/personFields?${params}`),
  ).then((response) => response.json());
  const contactSourceField = result.data.find((field) =>
    field.name.toLowerCase().includes(CONTACT_SOURCE_IDENTIFIER),
  );
  if (!contactSourceField) return {};
  const newsLetterOptionId = getNewsLetterOptionId(contactSourceField.options);
  if (!newsLetterOptionId) return {};
  return { [contactSourceField.key]: newsLetterOptionId };
}

/**
 * Finds the id of the 'Newsletter (Website)' option in a list of field options.
 *
 * @param options - Array of field options from a Pipedrive options field
 * @returns The id of the Newsletter (Website) option, or undefined if not found
 */
function getNewsLetterOptionId(
  options: PersonFieldData["options"],
): number | undefined {
  return options.find((option) =>
    option.label.toLowerCase().includes(WEBSITE_OPTION_IDENTIFIER),
  )?.id;
}

async function existingUserIdByEmail(
  { email }: { email: string },
  { api_token, url }: { api_token: string, url: string }
) {
  const params = new URLSearchParams({
    term: email,
    fields: 'email',
    exact_match: 'true',
    api_token,
  });
  const result = await fetch(
    new URL(`${url}/v1/persons/search?${params.toString()}`)
  ).then(response => response.json());
  return result.data?.items?.[0]?.item?.id || null;
}

async function subscribe(
  { name, email, consent }: { name: string, email: string, consent: boolean },
  { api_token, url }: { api_token: string, url: string }
) {
  const id = await existingUserIdByEmail({ email }, { api_token, url });
  const params = new URLSearchParams({ api_token });
  const contactSourceFieldInfo = await getContactSourceFieldInfo({
    api_token,
    url,
  });

  if (id) {
    // Do not update the user if they do not give consent
    if (!consent) { return }
    // If the user already exists, update their marketing status
    return fetch(`${url}/v2/persons/${id}?${params}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        marketing_status: 'subscribed',
        ...contactSourceFieldInfo,
      }),
    });
  }

  // If the user does not exist, create a new person
  return fetch(`${url}/v1/persons?${params}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email: [{ value: email, primary: true, label: 'work' }],
      marketing_status: consent ? 'subscribed' : 'no_consent',
      ...contactSourceFieldInfo,
    }),
  });
}
