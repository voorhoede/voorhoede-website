export default async function({ form, router, locale }) {
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

    router.push({
      name: `contact-slug___${locale}`,
      params: { slug: 'confirmation' }
    })
  } catch (error) {
    router.push({
      name: `contact-slug___${locale}`,
      params: { slug: 'error' }
    })
  }
}
