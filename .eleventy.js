module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("HANDOVER.md");
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin");

  eleventyConfig.addFilter("nl2br", function (value) {
    if (!value) return "";
    return value.replace(/\n/g, "<br>");
  });

  eleventyConfig.addCollection("sermons", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./content/sermons/*.md").sort(function (a, b) {
      return new Date(b.data.date) - new Date(a.data.date);
    });
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
