import { createClient } from "@sanity/client"

export const sanityClient = createClient({
  projectId: 'nol0j9y7',
  dataset: 'production',
  apiVersion: "2025-08-20",
  useCdn: true,
})