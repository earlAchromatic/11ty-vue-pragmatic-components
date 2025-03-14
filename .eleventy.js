const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite');
const viteConfig = require('./vite.config.js');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const util = require('util');
const fs = require('fs');

const componentRegistry = {
  myHeader: '../components/myHeader.vue',
  myFooter: '../components/myFooter.vue',
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ public: '/' });

  eleventyConfig.on(
    'eleventy.after',
    async ({ dir, results, runMode, outputMode }) => {
      results.forEach((result) => {
        if (result.content) {
          fs.writeFileSync(result.outputPath, transformContent(result.content));
        }
      });
    }
  );

function tryComponents(doc) {
  for (const [key, value] of Object.entries(componentRegistry)) {
    let registeredComponent = key;
    let registeredComponentPath = value;
    let comp = doc.querySelector(registeredComponent);

    if (!comp) continue;

    let childTemplate = comp.innerHTML;
    let VueWrapper = `
<div id="${registeredComponent}"></div>
<script type=module>
import {createApp} from "../node_modules/vue/dist/vue.esm-bundler.js";

createApp({
  data(){

  },
  template: \`
  <${registeredComponent}>
  ${childTemplate}
  </${registeredComponent}>
  \`
}).component('${registeredComponent}',${registeredComponent}).mount('#${registeredComponent}')
<\/script>
`;
    let el = doc.createElement('div');
    el.setAttribute('injectionPoint', true);
  }
}
