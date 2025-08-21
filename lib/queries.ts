export const heroImagesQuery = `
*[_type == "hero"][0].images[]{
  "src": image.asset->url,
  fallback,
  alt
}
`

export const heroQuery = `
*[_type == "hero"][0]{
  title,
  whatsappText,
  toursButtonText,
  whatsappNumber,
  images[]{
    "src": image.asset->url,
    fallback,
    alt
  }
}
`

export const generalQuery = `
*[_type == "general"][0]{
  location,
  callNumber,
  whatsappNumbers,
  slogan,
  email,
  whatsappChannel,
  openingHours[]{days, hours},
  social{facebook, instagram},
  "logoUrl": logo.asset->url
}
`