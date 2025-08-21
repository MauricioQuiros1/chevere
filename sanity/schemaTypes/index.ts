import { type SchemaTypeDefinition } from 'sanity'
import hero from './hero'
import general from './general'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    general,
  ],
}
