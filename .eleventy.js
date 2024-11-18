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
  eleventyConfig.addPassthroughCopy('node_modules');

  eleventyConfig.on(
    'eleventy.after',
    async ({ dir, results, runMode, outputMode }) => {
      // Read more below
      console.log(results[0].content);
      results.forEach((result) => {
        if (result.content) {
          console.log(`writing to ${result.outputPath}`);
          fs.writeFileSync(result.outputPath, transformContent(result.content));
        }
      });
    }
  );

function tryComponents(doc) {
  for (const [key, value] of Object.entries({key, value})) {

    console.log(`${key} at ${value}`);
    let comp = doc.querySelector(key);

    if (!comp) {
      continue;
    }

    let childTemplate = comp.innerHTML;

    //let props = Object.values(comp.attributes);

    let VueWrapper = `
<div id="${key}"></div>
<script type=module>
import {createApp} from "../node_modules/vue/dist/vue.esm-bundler.js";
import ${key} from "${value}";

createApp({
  data(){

  },
  template: \`
  <${key}>
  ${childTemplate}
  </${key}>
  \`
}).component('${key}',${key}).mount('#${key}')
<\/script>
`;
    let el = doc.createElement('div');
    el.setAttribute('injectionPoint', true);
    el.innerHTML = VueWrapper;
    comp.replaceWith(el);
  }
}
