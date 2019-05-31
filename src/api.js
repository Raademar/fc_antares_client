const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: 'ibmpg90g',
  dataset: 'production',
  token: `${process.env.REACT_APP_SANITY_AUTH_KEY}`,
  useCdn: true
})

module.exports = client
