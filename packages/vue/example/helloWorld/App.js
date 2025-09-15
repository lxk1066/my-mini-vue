import { h, reactive } from "../../dist/mini-vue.esm-bundler.js";

const obj = reactive({
  count: 0
});

export default {
  render() {
    return h("div", { id: "container" }, [
      h(
        "h1",
        {
          style: `color: ${obj.count > 3 ? "red" : "green"}`
        },
        "Vue3"
      ),
      h("p", { class: "content" }, obj.count),
      h(
        "button",
        {
          onClick() {
            obj.count++;
          }
        },
        "加一"
      )
    ]);
  },
};
