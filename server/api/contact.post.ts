import { createPipedriveClient } from "../lib/pipedrive";

const getWorkOrPersonalLabel = (business: string | null) => {
  return business && business.length > 0 ? "work" : "personal";
};

const handlePipedriveCommunication = async (
  apiToken: string,
  url: string,
  body: any,
) => {
  try {
    const pipedriveClient = createPipedriveClient({
      api_token: apiToken,
      url: url,
    });

    const personId = await pipedriveClient.findPersonByEmail({
      email: body.email,
    });
    let organizationId = await pipedriveClient.findOrganizationByName({
      name: body.business,
    });
    if (!organizationId && body.business && body.business.length > 0) {
      const orgResponse = await pipedriveClient.createOrganization({
        name: body.business,
        owner_id: personId || undefined,
      });
      organizationId = orgResponse.data.id;
    }

    const label = getWorkOrPersonalLabel(body.business);
    const phone = body.phone
      ? {
          value: body.phone,
          primary: true,
          label,
        }
      : undefined;

    const personInformation = {
      name: body.name,
      email: {
        value: body.email,
        primary: true,
        label,
      },
      phone,
      org_id: organizationId,
      notes: body.explanation,
      [pipedriveClient.getContactSourceFieldApiKey()]:
        pipedriveClient.getFormOptionId(),
    };
    if (personId) {

      await pipedriveClient.updatePerson({
        personId,
        updates: personInformation,
      });
    } else {
      await pipedriveClient.createPerson({ personData: personInformation });
    }
  } catch (error) {
    console.error("Pipedrive operation failed:", error);
  }
};

export default defineEventHandler(async (event) => {
  const honeypotFieldName = 'url-page';
  const config = useRuntimeConfig(event);
  const body = await readBody(event);

  if (
    !body?.name ||
    !body?.email ||
    !body.explanation ||
    body[honeypotFieldName]
  ) {
    return sendRedirect(event, '/en/contact/failed/');
  }
  handlePipedriveCommunication(
    config.pipedriveApiToken,
    config.pipedriveApiUrl,
    body,
  );

  const akismetData = new URLSearchParams({
    api_key: config.akismetApiToken,
    blog: config.public.baseUrl,
    user_ip: getRequestIP(event) || '',
    user_agent: getHeader(event, 'user-agent') || '',
    referrer: getHeader(event, 'referer') || '',
    comment_type: 'contact-form',
    comment_author: body.name,
    comment_author_email: body.email,
    comment_content: body.explanation,
  });

  const isSpam = await fetch('https://rest.akismet.com/1.1/comment-check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: akismetData.toString(),
  }).then((response) => response.text());

  if (isSpam === 'true') {
    return sendRedirect(event, '/en/contact/failed/');
  }

  console.info('Contact post data', '\n', {
    userIp: akismetData.get('user_ip'),
    userAgent: akismetData.get('user_agent'),
    referrer: akismetData.get('referrer'),
    commentAuthor: akismetData.get('comment_author'),
    isSpam,
  });

  return fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': config.postmarkApiToken,
    },
    body: JSON.stringify({
      MessageStream: 'contact-form',
      From: `"${body.name}" <forms@voorhoede.nl>`,
      To: 'post@voorhoede.nl',
      Subject: 'Voorhoede website contact form',
      TextBody: [
        ['From:', body.email],
        ['Name:', body.name],
        body.business && ['Company:', body.business],
        body.phone && ['Phone:', body.phone],
        ['Body:', body.explanation],
      ]
        .filter(Boolean)
        .map((pair) => [...pair, '\n'])
        .flat()
        .join('\n'),
    }),
  })
    .then(() => {
      return sendRedirect(event, '/en/contact/confirmation/', 303);
    })
    .catch(() => {
      return sendRedirect(event, '/en/contact/failed/');
    });
});
