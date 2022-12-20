export default async function({ form, router, localeUrl }) {
  try {
    const formData = new FormData(form);

    await fetch('./', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
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
