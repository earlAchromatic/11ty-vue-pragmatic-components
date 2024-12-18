# Pragmatic Vue Components 🔌

## Use Vue Components to author HTML/nunjucks/liquid layouts in 11ty SSG


The best part is, I can use slotting to write embedded markup inside components. I can even use other components inside my components just by adding the Vue elements.

---

Cons:

its a vue only solution
ships with vue runtime compiler
have to register components manually (how can I automate this)

Pros:

its a vue only solution
it is lighter weight than slinkity, simpler too
focuses on 1 framework
focuses on authorability (no shortcodes)
no shortcodes necessary for slotting

slots first approach - deeply nested slots are easily accomplished. This is important for templating.
props passing capable
SSR + partial hydr ready
simple script injection for render modes??? (separate plugin)
Just an 11ty plugin, not a whole wrapper around 11ty.
uses Vue async components for partial hydration on a per component's logic basis
leverages official 11ty maintained plugins
no custom elements required

## Feature list to build

- props seeker via attr
- 11ty data props builder/helper functions (see nunjucks loops to build data object in jacobmilhorn.com proj)
- multiple component loop (for the .componetn() func)
- recursive component recognition in child template (see above item, they are the same thing)
- automatic component registration based on whats in the `components` folder
- automatic node modules aliasing in vite config
