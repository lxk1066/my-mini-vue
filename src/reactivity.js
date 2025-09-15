/**
 * 响应式 Reactivity
 */

let activeEffect = null;

// 依赖收集器
class Dep {
  constructor(value) {
    this.subscribers = new Set();
  }
  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }
  notify() {
    this.subscribers.forEach(sub => {
      sub();
    });
  }
}

function watchEffect(effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}

const targetMap = new WeakMap(); // 全局存储依赖

/**
 * targetMap用来存储每个对象的depsMap
 * depsMap用来存储每个对象属性的依赖收集器(Dep)，每个Dep都存储了指定属性的所有effect函数
 * 这样设计的好处是，每个对象的属性都有属于自己的依赖收集器，当属性发生变化时，
 * 只需要找到该属性对应的依赖收集器然后一次性通知，而不需要进行全局通知，更省资源
 */

function getDep(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }

  return dep;
}

function reactive(raw) {
  return new Proxy(raw, {
    get(target, key, receiver) {
      const dep = getDep(target, key);

      dep.depend(); // 收集依赖
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const dep = getDep(target, key);

      const result = Reflect.set(target, key, value, receiver);
      dep.notify(); // 一定要在设置完成后再触发依赖
      return result;
    }
  });
}

export { watchEffect, reactive }

// 测试用例
// const obj = reactive({
//   num: 0,
// });

// watchEffect(() => {
//   console.log("watchEffect", obj.num);
// });

// obj.num++;