import { mount, patch, watchEffect } from "@mini-vue/runtime-core";

export function createApp(component, rootContainer) {
  let isMounted = false
  let visualDom = null

  if (!(rootContainer instanceof HTMLElement)) {
    return console.log('rootContainer must be HTMLElement');
  }

  watchEffect(() => {
    if (!isMounted) {
      visualDom = component.render()
      mount(visualDom, rootContainer)
      isMounted = true;
    } else {
      const newVDom = component.render()
      patch(visualDom, newVDom)
      visualDom = newVDom
    }
  })
}

export { h, reactive, watchEffect } from "@mini-vue/runtime-core"
