import { withQuery } from 'ufo'

export function useOpenGraphImage(openGraphImage) {
    if (!openGraphImage) {
        return
    }

    const { title, image, authors } = openGraphImage;

    const url = withQuery('/api/og', {
        title,
        imageUrl: image?.url,
    }) + `&authors=${JSON.stringify(authors)}`;

    useHead({
        meta: [
            { property: 'og:image', content: url },
            { property: 'og:image:width', content: '1000' },
            { property: 'og:image:height', content: '500' },
            { name: 'twitter:image', content: url },
        ],
    });
}