# react-simple-global-state-store-hook

https://github.com/masx200/react-simple-global-state-store-hook

基于`react hooks` 和`EventTarget` 实现的极简全局状态管理 库

，可以跨组件共享全局状态，拥有高性能

就像使用 `useState` 一样使用全局状态,非常简洁

# 使用简单,可能是使用方法最简单的全局状态管理工具！

使用步骤只有两步，初始化全局状态，组件状态与全局状态双向绑定

跟其他全局状态管理工具相比，使用这个库对于原有的代码不需要太多的修改

只管理状态仓库,修改全局状态的方法返回给组件内部调用,

就跟使用`useState`一样简单!

# 跟 redux 对比,极为简洁!抛弃 redux！

基于 `react hooks`和`EventTarget` 实现

可以在任何组件中使用全局状态，所有组件最外层不需要包裹`context.provider`

`redux`主要由`store`,`action`,`reducer`等等组成,过于庞大负杂,繁琐,组件太多无用的刷新，性能低下

## 组件状态与全局状态双向绑定

组件状态改变时全局状态改变

全局状态改变时组件状态改变

### 高性能 ，减少无用的组件刷新

不使用`context`刷新组件，而是使用`setstate`只刷新单个组件

如果使用`context`会导致大量组件的无用刷新

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

# 用法

```javascript
import {
  useGlobalStore,
  initGlobalState,
  getGlobalStates
} from "react-simple-global-state-store-hook";
```

### 函数`getGlobalStates`用来读取全局状态

### 函数`initGlobalState`用来生成状态初始值，

参数为一个`object`，键名为全局状态名，键值为全局状态初始值

### 函数`useGlobalStore`用来订阅全局状态，组件状态与全局状态双向绑定

第一个参数为一个`object`， 键名为全局状态名，键值为组件状态初始值

返回值是个`object`

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
import {
  useGlobalStore,
  initGlobalState
} from "react-simple-global-state-store-hook";

initGlobalState({
  testnumber: "初始值数字",
  全局状态testname: "初始值名字"
});
function component() {
  const {
    全局状态testname: [count, setCount]
  } = useGlobalStore({ 全局状态testname: "初始值" });
  return <div>{count}</div>;
}
```

### 也可以在一句中，定义多个全局共享状态

```javascript
const {
  count: [count, setCount],
  name: [name, setname]
} = useGlobalStore({ count: 0, name: "well" });
```

# 例如

要生成全局状态 `testnumber` ,初始值为 `88888785461111111`

```javascript
import {
  useGlobalStore,
  initGlobalState
} from "react-simple-global-state-store-hook";
initGlobalState({
  testnumber: 88888785461111111
});
//全局状态 testnumber 生成 ,初始值为 88888785461111111
function Htest() {
  const {
    testnumber: [number, setnumber]
  } = useGlobalStore({ testnumber: 78546 });
  //全局状态 testnumber 已经 生成 ,不会重复生成初始值

  return (
    <div>
      <p>
        number:
        {number}
      </p>
      <button
        onClick={() => {
          setnumber(number + 3);
          /*修改全局状态 testnumber,其他使用了全局状态number的组件也会刷新数据*/
        }}
      >
        修改number
      </button>
    </div>
  );
}
```

# 为什么要写这个状态管理工具？

因为

现有的 redux，mobx，vuex 等等管理工具使用太过繁琐，

不喜欢那些使用特别麻烦的状态管理工具

这个状态管理工具可能是学习成本和使用成本最低的

状态双向绑定使用非常简单

# 原理介绍

### 使用事件发布者订阅者模式

内部使用了 react hooks 中的 `useState` 和 `useEffect`

使用了通过在`EventTarget`上触发事件和接收事件的方式，来通知组件刷新，一个事件触发对应多个事件监听

把事件名称设置为`状态名称`,确保了一个全局状态的改变只会刷新使用这个状态的变量,不刷新其他变量,减少性能损耗

给每个要全局状态管理的变量,设置事件`状态名称`监听器 ,接收到事件后,把变量新的值从内部变量`reactsimpleglobalstatestore`中取出,然后执行`setstate`,通知组件刷新

当有全局变量改变时,把变量新的值存入内部变量`reactsimpleglobalstatestore`中,触发事件`状态名称`,

如果多个组件使用同一个全局状态,则改变一个状态,这些组件就会同步数据,组件刷新

如果一个全局状态在多个组件中被多次初始化,则只有第一次初始化的值存在全局状态中

当组件被卸载时，清除事件监听器，防止内存泄漏

当组件挂载之后,会自动同步全局状态

由于事件监听函数是异步执行，所以组件状态刷新也是异步执行的

# React

React 是一个用于构建用户界面的 JavaScript 库。

https://zh-hans.reactjs.org/tutorial/tutorial.html

# React Hooks

Hook 是 React 16.8 中的新增功能。它们允许您在不编写类的情况下使用状态和其他 React 功能。

https://reactjs.org/docs/hooks-overview.html#state-hook

# EventTarget

EventTarget 是一个由可以接收事件的对象实现的接口，并且可以为它们创建侦听器

https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget
