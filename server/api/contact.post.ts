import arcjet, { detectBot } from '@arcjet/node';
const config = useRuntimeConfig();

const arcjetClient = arcjet({
  key: config.arcjetApitoken,
  rules: [
    detectBot({ mode: 'LIVE', allow: [] }),
  ],
});

export default defineEventHandler(async (event) => {
  const honeypotFieldName = 'url-page';
  const body = await readBody(event);

  if (
    !body?.name || !body?.email || !body.explanation || body[honeypotFieldName]
  ) {
    return sendRedirect(event, '/en/contact/failed/');
  }

  const decision = await arcjetClient.protect(event.node.req);

  if (decision.isDenied() || decision.ip.isHosting()) {
    return sendRedirect(event, '/en/contact/failed/');
  }

  return fetch(
    'https://api.postmarkapp.com/email',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': config.postmarkApiToken,
      },
      body: JSON.stringify({
        'MessageStream': 'contact-form',
        'From': `"${body.name}" <forms@voorhoede.nl>`,
        'To': 'post@voorhoede.nl',
        'Subject': 'Voorhoede website contact form',
        'TextBody': [
          ['From:', body.email],
          body.business && ['Company:', body.business],
          body.phone && ['Phone:', body.phone],
          ['Body:', body.explanation],
        ]
          .filter(Boolean)
          .map((pair) => [...pair, '\n'])
          .flat()
          .join('\n'),
      }),
    },
  )
    .then(() => {
      return sendRedirect(event, '/en/contact/confirmation/', 303);
    })
    .catch(() => {
      return sendRedirect(event, '/en/contact/failed/');
    });
});
