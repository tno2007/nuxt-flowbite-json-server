import { nitro } from "node:process";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  // https://www.storyblok.com/faq/how-to-generate-routes-for-nuxt-js-using-storyblok
  hooks: {
    "nitro:init": async (nitro) => {
      console.log("pr", nitro._prerenderedRoutes);
    },
    "nitro:config": async (nitroConfig) => {
      console.log(process.env.NUXT_STORYBLOCK_TOKEN);
      console.log(process.env.nitroConfig);

      //if (!nitroConfig || nitroConfig.dev) {
      //  console.log("1");
      //  return;
      //}
      // const token = process.env.STORYBLOK_TOKEN

      console.log("2");

      let cache_version = 0;

      // other routes that are not in Storyblok with their slug.
      let routes = ["/"]; // adds home directly but with / instead of /home
      try {
        const result = await fetch(
          `https://api.storyblok.com/v2/cdn/spaces/me?token=${process.env.NUXT_STORYBLOCK_TOKEN}`
        );

        console.log("3");

        if (!result.ok) {
          console.log("4");
          throw new Error("Could not fetch Storyblok data");
        }

        console.log("5");

        // timestamp of latest publish
        const space = await result.json();

        console.log(space);

        cache_version = space.space.version;

        // Recursively fetch all routes and set them to the routes array
        await fetchStories(routes, cache_version);

        console.log("routes", routes);

        // Adds the routes to the prerenderer
        nitroConfig.prerender?.routes?.push(...routes);
      } catch (error) {
        console.log("error", error);
        console.error(error);
      }
    },
  },
});

export interface ILink {
  id: number;
  slug: string;
  name: string;
  is_folder: boolean;
  parent_id: number;
  published: boolean;
  path: any;
  position: number;
  uuid: string;
  is_startpage: boolean;
  real_path: string;
}

async function fetchStories(
  routes: string[],
  cacheVersion: number,
  page: number = 1
) {
  const version = "published";
  const perPage = 100;

  try {
    const response = await fetch(
      `https://api.storyblok.com/v2/cdn/links?token=${process.env.NUXT_STORYBLOCK_TOKEN}&version=${version}&per_page=${perPage}&page=${page}&cv=${cacheVersion}`
    );
    const data = await response.json();

    const toIgnore: string[] = [];

    // Add routes to the array
    Object.values(data.links as ILink[]).forEach((link) => {
      // console.log(link.slug);
      if (!toIgnore.includes(link.slug)) {
        // console.log(link.slug);
        routes.push("/" + link.slug);
      }
    });

    // Check if there are more pages with links

    const total = response.headers.get("total");
    if (!total) return;
    const maxPage = Math.ceil(parseInt(total) / perPage);

    if (maxPage > page) {
      await fetchStories(routes, cacheVersion, ++page);
    }
  } catch (error) {
    console.error(error);
  }
}
