# react-simple-global-state-store-hook

使用 react hooks 实现的简单全局状态管理 react-simple-global-state-store-hook

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

例如:要生成全局状态 `number` ,初始值为 `78546`

```javascript
import useGlobalstate from "react-simple-global-state-store";
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

给每个要全局状态管理的变量,设置事件`"globalstatechange"`监听器 ,接收到事件后,把变量新的值从内部变量`reactsimpleglobalstatestore`中取出,然后执行`setstate`

当有全局变量改变时,把变量新的值存入内部变量`reactsimpleglobalstatestore`中,触发事件`"globalstatechange"`,
