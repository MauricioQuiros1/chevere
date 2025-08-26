export const heroImagesQuery = `
*[_type == "hero"][0]{
  desktopImages[]{"src": image.asset->url, fallback, alt},
  mobileImages[]{"src": image.asset->url, fallback, alt}
}
`

export const heroQuery = `
*[_type == "hero"][0]{
  title,
  whatsappText,
  toursButtonText,
  whatsappNumber,
  desktopImages[]{"src": image.asset->url, fallback, alt},
  mobileImages[]{"src": image.asset->url, fallback, alt}
}
`

export const generalQuery = `
*[_type == "general"][0]{
  companyBrief,
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
  header{homeLabel, aboutLabel, toursLabel, transfersLabel, contactLabel, whatsappCtaText},
  hero{title, whatsappText, toursButtonText},
  toursSection{title, emptyMessage},
  footer{rightsText},
  common{reserveWhatsAppLabel, viewDetailsLabel, pricesTitle, bestPriceBadge}
}
`

export const customTourFormQuery = `
*[_type == "customTourForm"][0]{
  title,
  subtitle,
  submitLabel,
  fields[]{name, label, type, placeholder, required}
}
`

export const transfersSectionQuery = `
*[_type == "transfersSection"][0]{
  title,
  subtitle,
  airportServices[]{
    title, description, price, duration, capacity, features,
    "image": coalesce(image.asset->url, imageUrl)
  },
  hourlyServices[]{
    title, description, price, minHours, capacity, features,
    "image": coalesce(image.asset->url, imageUrl)
  }
}
`

export const testimonialsSectionQuery = `
*[_type == "testimonialsSection"][0]{
  title,
  testimonials[]{
    name, location, rating, text,
    "image": coalesce(image.asset->url, imageUrl),
    "fallback": coalesce(fallbackImage.asset->url, fallbackUrl)
  }
}
`

export const contactPageQuery = `
*[_type == "contactPage"][0]{
  pageTitle,
  pageDescription,
  form{
    title,
    submitLabel,
    fields[]{name, label, type, placeholder, required}
  },
  directContact{title, description, buttonLabel}
}
`

export const toursSimpleListQuery = `
*[_type == "tour"]{
  "id": slug.current,
  name,
  people
}
`

export const aboutPageQuery = `
*[_type == "aboutPage"][0]{
  heroTitle,
  heroSubtitle,
  founder{ name, role, description, badges, "image": coalesce(image.asset->url, imageUrl) },
  stats[]{ icon, value, label },
  teamTitle,
  teamSubtitle,
  teamCards[]{ icon, title, description },
  valuesTitle,
  valuesSubtitle,
  values[]{ icon, title, description, colorClass }
}
`