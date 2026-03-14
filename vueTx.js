eleventyConfig.addTransform(
  'vue-component-wrap',
  function (content, outputPath) {
    let dom = new JSDOM(content);
    let doc = dom.window.document;

    function tryComponents() {
      for (const [key, value] of Object.entries(componentRegistry)) {
        let comp = doc.querySelector(component);
        if (!comp) {
          return;
        }

        let childTemplate = comp.innerHTML;

        console.log(childTemplate);

        let VueWrapper = `
      <div id="${component}">
      <script type=module>
      import {createApp} from "./node_modules/vue";
      import ${component} from "${registeredComponentPath}";
      createApp({
        name: ${component},
        data(){},
        template: \`${childTemplate}\`
      }).mount('#${component}')
      <\/script>
      `;
        let el = doc.createElement('div');
        el.innerHTML = VueWrapper;
        comp.appendChild(el);
        //comp.replaceWith(VueWrapper);
      }
    }

    tryComponents();

    return dom.serialize();
  }
);
