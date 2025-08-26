import { type SchemaTypeDefinition } from 'sanity'
import hero from './hero'
import general from './general'
import tour from './tour'
import translations from './translations'
import customTourForm from './customTourForm'
import transfersSection from './transfersSection'
import testimonialsSection from './testimonialsSection'
import contactPage from './contactPage'
import aboutPage from './aboutPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    general,
    hero,
  tour,
  customTourForm,
  transfersSection,
  testimonialsSection,
  contactPage,
  aboutPage,
  ],
}
