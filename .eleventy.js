const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite');
const viteConfig = require('./vite.config.js');
const jsdom = require('jsdom');

const util = require('util');
const util = require('futil');



const componentRegistry = {
  myHeader: '../components/myHeader.vue',
  myFooter: '../componentx/myFoot.vue',
  Loading: '../components/Loading.vue'
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ public: '/' });
  eleventyConfig.on(
    'eleventy.after',
    async ({ dir, results, runMode, outputMode }) => {


      // Read more below
      console.log(results[0].content);
    
  return {
    dir: {
      input: 'src',
    },
  };
}


function tryComponents(doc) {
  for (const [key, value] of Object.entries(componentRegistry)) {
    let registeredComponent = key;
    let registeredComponentPath = value;
    console.log(`${registeredComponent} at ${registeredComponentPath}`);
    let comp = doc.querySelector(registeredComponent);
    if (!comp) {
      continue;
    }

    let childTemplate = comp.innerHTML;

    let componentString = '';

    let tempComponentReg = [];

    //check comp recursively against component registry

    //let props = Object.values(comp.attributes);

    let VueWrapper = `
<div id="${registeredComponent}"></div>
<script type=module>
import {createApp} from "../node_modules/vue/dist/vue.esm-bundler.js";
import ${registeredComponent} from "${registeredComponentPath}";

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
    el.innerHTML = VueWrapper;
    comp.replaceWith(el);
  }
}