import { reactive, watchEffect } from './reactivity.js';
import { h, mount, patch } from './renderer.js';

function createApp(component, container) {
  let isMounted = false
  let visualDom = null

  if (!(container instanceof HTMLElement)) {
    return console.log('container must be HTMLElement');
  }

  watchEffect(() => {
    if (!isMounted) {
      visualDom = component.render()
      mount(visualDom, container)
      isMounted = true;
    } else {
      const newVDom = component.render()
      patch(visualDom, newVDom)
      visualDom = newVDom
    }
  })
}

export { createApp, h, reactive, watchEffect };