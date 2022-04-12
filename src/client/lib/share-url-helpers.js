function getTwitterUrl(url, shareText = '') {
  const parameters = new URLSearchParams({
    text: shareText,
    url,
    via: 'devoorhoede'
  })

  return `https://twitter.com/intent/tweet?${ parameters.toString() }`
}

function getFacebookUrl(url, shareText = '') {
  const parameters = new URLSearchParams({
    u: url,
    t: shareText
  })

  return `https://www.facebook.com/sharer/sharer.php?${ parameters.toString() }`
}

function getLinkedinUrl(url, shareText = '') {
  const parameters = new URLSearchParams({
    url,
    title: shareText
  })

  return `https://www.linkedin.com/sharing/share-offsite/?${ parameters.toString() }`
}

export { getTwitterUrl, getFacebookUrl, getLinkedinUrl }
