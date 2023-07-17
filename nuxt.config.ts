// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],

  /*
  // https://www.storyblok.com/faq/how-to-generate-routes-for-nuxt-js-using-storyblok
  hooks: {
    async 'nitro:config'(nitroConfig) {
      if (!nitroConfig || nitroConfig.dev) {
        return
      }
      const token = process.env.STORYBLOK_TOKEN
 
      let cache_version = 0
 
      // other routes that are not in Storyblok with their slug.
      let routes = ['/'] // adds home directly but with / instead of /home
      try {
        const result = await fetch(`https://api.storyblok.com/v2/cdn/spaces/me?token=${token}`)
 
        if (!result.ok) {
          throw new Error('Could not fetch Storyblok data')
        }
        // timestamp of latest publish
        const space = await result.json()
        cache_version = space.space.version
 
        // Recursively fetch all routes and set them to the routes array
        await fetchStories(routes, cache_version)
       // Adds the routes to the prerenderer
        nitroConfig.prerender.routes.push(...routes)
      } catch (error) {
        console.error(error)
      }
    },
  },
  */
});

/*
async function fetchStories(routes: string[], cacheVersion: number, page: number = 1) {
  const token = process.env.STORYBLOK_TOKEN
  const version = 'published'
  const perPage = 100
 
  try {
 const response = await fetch(
      `https://api.storyblok.com/v2/cdn/links?token=${token}&version=${version}&per_page=${perPage}&page=${page}&cv=${cacheVersion}`,
    )
    const data = await response.json()
 
    // Add routes to the array
    Object.values(data.links).forEach(link => {
      if (!toIgnore.includes(link.slug)) {
        routes.push('/' + link.slug)
      }
    })
 
    // Check if there are more pages with links
 
    const total = response.headers.get('total')
    const maxPage = Math.ceil(total / perPage)
 
    if (maxPage > page) {
      await fetchStories(routes, cacheVersion, ++page)
    }
  } catch (error) {
    console.error(error)
  }
}
*/