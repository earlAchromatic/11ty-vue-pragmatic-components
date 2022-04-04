const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite');
const viteConfig = require('./vite.config.js');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const util = require('util');
const { default: vuePlugin } = require('@vitejs/plugin-vue');
const fs = require('fs');

const componentRegistry = {
  myHeader
      });
    }
  );

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    tempFolderName: '.11ty-vite', // Default name of the temp folder

    // Defaults are shown:
    viteOptions: viteConfig,
  });
};

function transformContent(content) {
  let dom = new JSDOM(content);
  let doc = dom.window.document;

  tryComponents(doc);

  return dom.serialize();
}ntries(componentRegistry)) {
    let registeredComponent = key;
    let registeredComponentPath = value;
    console.log(`${registeredComponent} at ${registeredComponentPath}`);
    let comp = doc.querySelector(registeredComponent);

    if (!comp) {
      continue;
    }

    let childTemplate = comp.innerHTML;

    //let props = Object.values(comp.attributes);

    let VueWrapper = `
<div id="${registeredComponent}"></div>
<script type=m
./node_modules/vue/dist/vue.esm-bundler.js";
import ${registeredComponent} from "${registeredComponentPath}";
ue.esm-bundler.js";
import ${registeredComponent} froue.esm-bundler.js";
import ${registeredComponent} fro
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
