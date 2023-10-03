const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite');
const viteConfig = require('./vite.config.js');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const util = require('util');
const { default: vuePlugin } = require('@vitejs/plugin-vue');
const fs = require('fs');

const componentRegistry = {
  myHeader: '../components/myHeader.vue',
  myFooter: '../components/myFooter.vue',
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ public: '/' });
  eleventyConfig.addPassthroughCopy('components');
  eleventyConfig.addPassthroughCopy('node_modules');

  eleventyConfig.on(
    'eleventy.before',
    async ({ dir, results, runMode, outputMode }) => {
      // Read more below
      console.log(results[0].content);
      
      });
    }
  );

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    tempFolderName: '.11ty-vite', // Default name of the temp folder

    // Defaults are shown:
    viteOptions: viteConfig,
  });
};
