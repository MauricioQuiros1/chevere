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

export const toursListQuery = `
*[_type == "tour"] | order(_createdAt desc){
  _id,
  "id": slug.current,
  name,
  brief,
  hours,
  people,
  location,
  priceFromUSD,
  "image": image.asset->url,
  fallback
}
`

export const tourDetailQuery = `
*[_type == "tour" && slug.current == $id][0]{
  _id,
  "id": slug.current,
  name,
  brief,
  hours,
  people,
  location,
  priceFromUSD,
  introTitle,
  introDescription,
  "image": image.asset->url,
  fallback,
  gallery[]{
    "src": image.asset->url,
    alt
  },
  includes,
  recommendations,
  pricingTiers[]{people, priceUSD, popular}
}
`

export const translationsByLocale = `
*[_type == "translations" && locale == $locale][0]{
  locale,
  header{homeLabel, aboutLabel, toursLabel, transfersLabel, contactLabel},
  hero{title, whatsappText, toursButtonText},
  toursSection{title, emptyMessage},
  footer{rightsText},
  common{reserveWhatsAppLabel, viewDetailsLabel, pricesTitle, bestPriceBadge}
}
`