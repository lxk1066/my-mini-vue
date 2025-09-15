/**
 * 渲染器 Renderer
 */

interface CreateElement {
  tag: string
  props: Record<string, any>
  children: string | CreateElement[]
}

// 生成vDom
function h(tag: string, props: Record<string, any>, children: string | CreateElement[]): CreateElement {
  return {
    tag,
    props,
    children
  };
}

// 挂载
function mount(vnode, container) {
  const el = (vnode.el = document.createElement(vnode.tag));
  // props
  if (vnode.props) {
    for (const key in vnode.props) {
      // 对于绑定事件，需要设置事件处理函数
      if (key.startsWith('on')) {
        const event = key.slice(2).toLowerCase();
        el.addEventListener(event, vnode.props[key]); // 需要拓展事件监听器的销毁
      } else { // 其他属性照常设置
        el.setAttribute(key, vnode.props[key]);
      }
    }
  }
  // children
  if (["string", "number", "boolean"].includes(typeof vnode.children)) {
    el.textContent = String(vnode.children);
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => {
      mount(child, el);
    });
  }
  container.appendChild(el);
}

// 补丁/更新新旧vdom(diff)
function patch(n1, n2) {
  const el = (n2.el = n1.el);

  if (n1.tag === n2.tag) {
    // props
    const oldProps = n1.props || {};
    const newProps = n2.props || {};
    for (const key in newProps) {
      const newValue = newProps[key];
      const oldValue = oldProps[key];
      if (newValue !== oldValue) {
        el.setAttribute(key, newValue);
      }
    }
    for (const key in oldProps) {
      if (!(key in newProps)) {
        el.removeAttribute(key);
      }
    }

    // children
    const oldChildren = n1.children;
    const newChildren = n2.children;
    if (typeof newChildren === "string") {
      if (typeof oldChildren === "string") {
        if (newChildren !== oldChildren) {
          el.textContent = newChildren;
        }
      } else {
        el.textContent = newChildren;
      }
    } else if (Array.isArray(newChildren)) {
      if (typeof oldChildren === 'string') {
        el.innerHTML = '';
        newChildren.forEach(child => {
          mount(child, el);
        });
      } else {
        const commonLength = Math.min(oldChildren.length, newChildren.length);
        for (let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChildren[i]);
        }

        newChildren.slice(oldChildren).forEach(child => {
          mount(child, el);
        });
        oldChildren.slice(newChildren).forEach(child => {
          el.removeChild(child.el);
        })
      }
    }
  } else {
    // replace 新旧dom的标签不同，需要替换操作
  }
}

export { h, mount, patch }
