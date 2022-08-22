/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  serverDependenciesToBundle: [
    "mdx-bundler",
    "rehype-slug", 
    "hast-util-has-property", 
    "hast-util-heading-rank",
    "hast-util-to-string",
    "unist-util-visit", 
    "unist-util-visit-parents",
    "unist-util-is"
  ],
};
