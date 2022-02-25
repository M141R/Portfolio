module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/js");

    return {
        dir: {
          input: "src",
          output: "public",
        },
      };
}