import { acceptsLanguages } from '@std/http/negotiation';
import { cookieName, defaultLanguage, locales } from '~/lib/i18n.js';

const localeCodes = locales.map(({ code }) => code);

export default defineEventHandler((event) => {
  const request = toWebRequest(event);
  const chosenLanguage = getCookie(event, cookieName);

  if (localeCodes.includes(chosenLanguage)) {
    return sendRedirect(
      event,
      `/${chosenLanguage}/`,
      302,
    );
  }

  const clientLocale = acceptsLanguages(
    request,
    ...localeCodes,
  );

  sendRedirect(
    event,
    `/${clientLocale || defaultLanguage}/`,
    302,
  );
});
