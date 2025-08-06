import { createPipedriveClient, type PipedriveClient } from '../lib/pipedrive';

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

  const pipedriveClient = createPipedriveClient({
    api_token: config.pipedriveApiToken,
    url: config.pipedriveApiUrl
  });

  try {
    await subscribe(pipedriveClient, { name, email, consent });
    return sendRedirect(event, `/${locale}/${CONFIRMATION_REDIRECT}`, 303);
  } catch (error) {
    console.error('Error subscribing user', error);
    return sendRedirect(event, `/${locale}/${FAILED_REDIRECT}`);
  }
});

async function subscribe(
  pipedriveClient: PipedriveClient,
  { name, email, consent }: { name: string, email: string, consent: boolean }
) {
  const contactSourceFieldApiKey = pipedriveClient.getContactSourceFieldApiKey();
  const newsletterOptionId = pipedriveClient.getNewsletterOptionId();
  const personId = await pipedriveClient.findPersonByEmail({ email });

  if (personId) {
    // Do not update the user if they do not give consent
    if (!consent) {
      return;
    }

    // If the user already exists, update their marketing status
    return pipedriveClient.updatePerson({
      personId,
      updates: {
        marketing_status: 'subscribed',
        [contactSourceFieldApiKey]: newsletterOptionId,
      },
    });
  }

  // If the user does not exist, create a new person
  return pipedriveClient.createPerson({
    personData: {
      name,
      email: [{ value: email, primary: true, label: 'work' }],
      marketing_status: consent ? 'subscribed' : 'no_consent',
      [contactSourceFieldApiKey]: newsletterOptionId,
    }
  });
}
