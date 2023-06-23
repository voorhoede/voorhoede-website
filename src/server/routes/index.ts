import { locales } from '../../lib/i18n';

export default defineEventHandler((event) => {
  const savedLanguage = getCookie(event, 'nf_lang');
  const matchingLanguage = getFirstMatchingLanguage(getHeader(event, 'Accept-Language'));

  return sendRedirect(event, `/${savedLanguage || matchingLanguage || 'en'}/`, 302);
});

function getFirstMatchingLanguage(header: String | undefined) {
  // Split header content including language variants to match the base language tag
  return String(header)
    .split(/,|;|=|-/)
    .find((locale) => isValidLocale(locale));
}

function isValidLocale(locale: String) {
  return locales.find(({ code }) => code === locale);
}
