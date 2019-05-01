const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: 'ibmpg90g',
  dataset: 'production',
  useCdn: true
})

module.exports = client
