# react-simple-global-state-store-hook

使用 react hooks 实现的简单全局状态管理 react-simple-global-state-store-hook

## 仅仅使用44行代码写成的极简react全局状态管理库!

[查看源代码](https://github.com/masx200/react-simple-global-state-store-hook/blob/master/src/react-simple-global-state-store.js)

## 局部安装

```
cnpm install  --save https://github.com/masx200/react-simple-global-state-store-hook.git
```

或者

```
yarn add https://github.com/masx200/react-simple-global-state-store-hook.git
```

## 基础语法

只能在 react 的函数式组件中使用!

以下示例使用了`es6`的解构赋值方法

```javascript
import useGlobalstate from "react-simple-global-state-store-hook";
let {
  全局状态的名称: [状态, 设置状态]
} = useGlobalstate({ 全局状态的名称: 初始值 });
```

例如:要生成全局状态 `number` ,初始值为 `78546`

```javascript
import useGlobalstate from "react-simple-global-state-store-hook";
function Htest() {
  let {
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

把事件名称设置为`"globalstatechange"+全局状态名称`,确保了一个全局状态的改变只会刷新使用这个状态的变量,不刷新其他变量,减少性能损耗

给每个要全局状态管理的变量,设置事件`"globalstatechange"`监听器 ,接收到事件后,把变量新的值从内部变量`reactsimpleglobalstatestore`中取出,然后执行`setstate`

当有全局变量改变时,把变量新的值存入内部变量`reactsimpleglobalstatestore`中,触发事件`"globalstatechange"`,

如果多个组件使用同一个全局状态,则改变一个这些组件就会同步数据


# React Hooks

Hook 是 React 16.8 中的新增功能。它们允许您在不编写类的情况下使用状态和其他 React 功能。

https://reactjs.org/docs/hooks-overview.html#state-hook
