export default defineEventHandler((event) => (
  sendRedirect(event, "/en/", 302)
));
