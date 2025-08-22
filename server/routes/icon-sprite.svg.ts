import github from '~/assets/icons/github.svg?symbol';
import pin from '~/assets/icons/pin.svg?symbol';
import youtube from '~/assets/icons/youtube.svg?symbol';
import linkedin from '~/assets/icons/linkedin.svg?symbol';
import mastodon from '~/assets/icons/mastodon.svg?symbol';
import play from '~/assets/icons/play.svg?symbol';
import facebook from '~/assets/icons/facebook.svg?symbol';

const responseBody = [
  '<svg xmlns="http://www.w3.org/2000/svg">',
  github,
  pin,
  youtube,
  linkedin,
  mastodon,
  play,
  facebook,
  '</svg>',
].join('');

export default defineEventHandler((event) => {
  setResponseHeaders(event, {
    'Content-Type': 'image/svg+xml',
  });

  return responseBody;
});
