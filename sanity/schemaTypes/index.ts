import { type SchemaTypeDefinition } from 'sanity'
import hero from './hero'
import general from './general'
import tour from './tour'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    general,
  tour,
  ],
}
