export default function (title) {
  return `${title.replace(/[^A-Za-z]+/g, '-').toLowerCase()}`;
}
