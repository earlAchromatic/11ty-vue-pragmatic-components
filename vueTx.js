eleventyConfig.addTransform(
  'vue-component-wrap',
  function (content, outputPath) {
    let dom = new JSDOM(content);
    let doc = dom.window.document;
    //replace Header with

    function tryComponents() {
      for (const [key, value] of Object.entries(componentRegistry)) {
        let registeredComponent = key;
        let registeredComponentPath = value;
        console.log(key);
        let comp = doc.querySelector(registeredComponent);
        console.log(comp);
        if (!comp) {
          return;
        }

        let childTemplate = comp.innerHTML;

        console.log(childTemplate);

        let VueWrapper = `
      <div id="${registeredComponent}">
      import {createApp} from "./node_modules/vue";
      import ${registeredComponent} from "${registeredComponentPath}";
      createApp({
        name: ${registeredComponent},
        data(){},
        template: \`${childTemplate}\`
      }).mount('#${registeredComponent}')
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
