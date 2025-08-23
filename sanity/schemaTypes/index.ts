import { type SchemaTypeDefinition } from 'sanity'
import hero from './hero'
import general from './general'
import tour from './tour'
import translations from './translations'
import customTourForm from './customTourForm'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    general,
  tour,
  translations,
  customTourForm,
  ],
}
