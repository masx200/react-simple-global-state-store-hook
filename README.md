# react-simple-global-state-store-hook

https://github.com/masx200/react-simple-global-state-store-hook

基于 react hooks 实现的极简全局状态管理 `react-simple-global-state-store-hook`，可以跨组件共享全局状态

# 跟 redux 对比,极为简洁!抛弃 redux！

可以在任何组件中使用全局状态，所有组件最外层不需要包裹`provider`

`redux`主要由`store`,`action`,`reducer`等等组成,过于庞大负杂,繁琐

`react-simple-global-state-store-hook`只管理状态仓库,修改全局状态的方法返回给组件内部调用,就跟使用`useState`一样简单!

## 仅仅使用 几十 行代码写成的极简 react 全局状态管理库!

[查看源代码](https://github.com/masx200/react-simple-global-state-store-hook/blob/master/src/react-simple-global-state-store.js)

### 演示网址

https://masx200.github.io/index.html#/react-simple-global-state-store-hook

## 局部安装

```
cnpm install  --save https://github.com/masx200/react-simple-global-state-store-hook.git
```

或者

```
yarn add https://github.com/masx200/react-simple-global-state-store-hook.git
```

## 基础语法

只能在 `react` 的函数式组件中使用!

以下示例使用了`es6`的解构赋值方法

就跟使用`useState`一样简单!

```javascript
import React, { useState } from "react";
const [count, setCount] = useState(0);
```

使用`react-simple-global-state-store-hook`

```javascript
import useGlobalstate from "react-simple-global-state-store-hook";
const {
  全局状态的名称: [count, setCount]
} = useGlobalstate({ 全局状态的名称: "初始值" });
```

也可以在一句中，定义多个全局共享状态

```javascript
const {
  count: [count, setCount],
  name: [name, setname]
} = useGlobalstate({ count: 0, name: "well" });
```

例如:要生成全局状态 `number` ,初始值为 `78546`

```javascript
import useGlobalstate from "react-simple-global-state-store-hook";
function Htest() {
  const {
    number: [number, setnumber]
  } = useGlobalstate({ number: 78546 });

  //全局状态 number 生成 ,初始值为 78546

  return (
    <div>
      <p>
        number:
        {number}
      </p>
      <button
        onClick={() => {
          setnumber(number * 3);
          /*修改全局状态number,其他使用了全局状态number的组件也会刷新数据*/
        }}
      >
        修改number
      </button>
    </div>
  );
}
```

[简单的示例](https://github.com/masx200/react-simple-global-state-store-hook/blob/master/src/index.js)

## 原理介绍

内部使用了 react hooks 中的 `useState` 和 `useEffect`

使用了通过在`EventTarget`上触发事件和接收事件的方式，来通知组件刷新，一个事件触发对应多个事件监听

把事件名称设置为`"globalstatechange"+状态名称`,确保了一个全局状态的改变只会刷新使用这个状态的变量,不刷新其他变量,减少性能损耗

给每个要全局状态管理的变量,设置事件`"globalstatechange"+状态名称`监听器 ,接收到事件后,把变量新的值从内部变量`reactsimpleglobalstatestore`中取出,然后执行`setstate`,通知组件刷新

当有全局变量改变时,把变量新的值存入内部变量`reactsimpleglobalstatestore`中,触发事件`"globalstatechange"+状态名称`,

如果多个组件使用同一个全局状态,则改变一个状态,这些组件就会同步数据,组件刷新

如果一个全局状态在多个组件中被多次初始化,则只有第一次初始化的值存在全局状态中

当组件被卸载时，清除事件监听器，防止内存泄漏

当组件挂载之后,会自动同步全局状态

# React Hooks

Hook 是 React 16.8 中的新增功能。它们允许您在不编写类的情况下使用状态和其他 React 功能。

https://reactjs.org/docs/hooks-overview.html#state-hook
