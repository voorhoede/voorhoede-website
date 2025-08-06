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

/**
 * The API key for the 'Contact Source' field.
 * This API key is can be checked in the Pipedrive UI.
 */
const CONTACT_SOURCE_FIELD_APIKEY = "777843b709aa29ae549063f689f7a6bd4c06b481";

/**
 * The ID of the 'Newsletter (Website)' option in the 'Contact Source' field.
 * This ID is cannot be checked in the Pipedrive UI.
 * Based on light testing with removing and adding option fields, I assume this ID will remain the same but there is no guarantee.
 */
const NEWSLETTER_OPTION_ID = 309;

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

  if (id) {
    // Do not update the user if they do not give consent
    if (!consent) { return }
    // If the user already exists, update their marketing status
    return fetch(`${url}/v2/persons/${id}?${params}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        marketing_status: 'subscribed',
        [CONTACT_SOURCE_FIELD_APIKEY]: NEWSLETTER_OPTION_ID,
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
      [CONTACT_SOURCE_FIELD_APIKEY]: NEWSLETTER_OPTION_ID,
    }),
  });
}
