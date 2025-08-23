import { type SchemaTypeDefinition } from 'sanity'
import hero from './hero'
import general from './general'
import tour from './tour'
import translations from './translations'
import customTourForm from './customTourForm'
import transfersSection from './transfersSection'
import testimonialsSection from './testimonialsSection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    general,
  tour,
  translations,
  customTourForm,
  transfersSection,
  testimonialsSection,
  ],
}
