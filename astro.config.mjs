import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://siristechnology.com',
  output: 'static',
  trailingSlash: 'ignore',
  compressHTML: true,
})
