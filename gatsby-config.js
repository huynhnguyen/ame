/**
 * @type {import('gatsby').GatsbyConfig}
 */
console.log([process.env.NODE_ENV])
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: `ummo.vn`,
    siteUrl: `https://www.ummo.vn`,
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-root-import"
  ],
}
