import { stringify } from 'query-string'

export const ogImageUrl = ({ title, authors = [], imageUrl, baseUrl }) => {
    return new URL(`/api/og?${stringify({
        title: title,
        'image-url': imageUrl,
        'authors': JSON.stringify(authors?.map(
          ({ name, image }) => ({ name, 'imageUrl': image?.url })
        )) 
      })}`, baseUrl).toString()
}
