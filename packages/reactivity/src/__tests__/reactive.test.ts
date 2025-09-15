import { reactive } from "../reactive";

describe('reactive', () => {
  
  test('Object', () => {
    const obj = { foo: 1 };
    const observed = reactive(obj);
    // 响应式对象不等于源对象
    expect(observed).not.toBe(obj);
    // 测试get响应式对象 observed.foo === 1
    expect(observed.foo).toBe(1);

    // 测试响应式
    observed.foo++;
    expect(observed.foo).toBe(2);
    // 响应式对象是对源对象的(非侵入式)代理，代理对象发生变化源对象也会发生变化
    expect(observed.foo).toBe(obj.foo);
  });
  
});
