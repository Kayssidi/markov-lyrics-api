const autoprefixer = require('autoprefixer')

module.exports = {
  siteMetadata: {
    title: 'Markov Lyrics',
  },
  pathPrefix: '/gatsby-starter-grommet',
  plugins: [
    {
      resolve: 'custom-sass-loader',
      options: {
        postCssPlugins: [
          autoprefixer({
            browsers: ['last 2 versions'],
          })
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "MarkovLyrics",
        short_name: "MarkLyr",
        start_url: "/",
        background_color: "#f7f0eb",
        theme_color: "#a2466c",
        display: "standalone",
        icon: "src/icon.png", // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
  ],
}

