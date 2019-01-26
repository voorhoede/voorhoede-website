export default async function({ form, router, localeUrl }) {
  try {
    const body = new URLSearchParams()

    Object.keys(form).forEach(key => {
      body.append(key, form[key])
    })

    await fetch('./', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    })

    router.push(localeUrl({
      name: 'contact-slug',
      params: { slug: 'confirmation' }
    }))
  } catch (error) {
    router.push(localeUrl({
      name: 'contact-slug',
      params: { slug: 'error' }
    }))
  }
}
