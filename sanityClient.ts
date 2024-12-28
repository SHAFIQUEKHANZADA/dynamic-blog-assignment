import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_ID, 
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,  
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,  
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export default client;
