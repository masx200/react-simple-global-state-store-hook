import { useState, useEffect, useCallback } from "react";

const temptarget = new EventTarget();
const simpleglobalstatestore = {};
function newobjjson(obj) {
  if (typeof obj !== "object") {
    throw new TypeError("传入的参数必须是个object!");
  }
  return JSON.parse(JSON.stringify(obj));
}
function isobject(o) {
  return (
    typeof o === "object" &&
    Object.prototype.toString.call(o) === "[object Object]" &&
    o.__proto__ === Object.prototype
  );
}
export function useGlobalStore(jsonobject) {
  if (!isobject(jsonobject)) {
    throw Error("invalid object");
  }

  const newjsonobj = newobjjson(jsonobject);
  const newobjtoreturn = {};
  Object.keys(newjsonobj).forEach(key => {
    const eventname = "globalstatechange-" + key;
    const [state, setstate] = useState(newjsonobj[key]);
    if ("undefined" === typeof simpleglobalstatestore[key]) {
      simpleglobalstatestore[key] = newjsonobj[key];
    }
    const eventhandler = useCallback(() => {
      const newstate = simpleglobalstatestore[key];
      //   console.log("接受事件 " + eventname);
      setstate(newstate);
    }, []);
    useEffect(() => {
      temptarget.addEventListener(eventname, eventhandler);
      temptarget.dispatchEvent(new Event(eventname));
      return () => {
        temptarget.removeEventListener(eventname, eventhandler);
      };
    }, []);
    newobjtoreturn[key] = [
      state,
      newstate => {
        if (
          "undefined" === typeof newstate ||
          "function" === typeof newstate ||
          newstate === null
        ) {
          throw Error("invalid state");
        }

        if (JSON.stringify(newstate) !== JSON.stringify(state)) {
          simpleglobalstatestore[key] = JSON.parse(
            JSON.stringify(newstate)
          );
          //   console.log("触发事件 " + eventname);
          console.log("全局状态改变", simpleglobalstatestore);
          temptarget.dispatchEvent(new Event(eventname));
        }
      }
    ];
  });
  return newobjtoreturn;
}
export function initGlobalState(jsonobject) {
  if (!isobject(jsonobject)) {
    throw Error("invalid object");
  }

  const newjsonobj = newobjjson(jsonobject);
  const newobjtoreturn = {};

  Object.keys(newjsonobj).forEach(key => {

    if ("undefined" === typeof simpleglobalstatestore[key]) {
      simpleglobalstatestore[key] = newjsonobj[key];
    }
    newobjtoreturn[key] = simpleglobalstatestore[key];
  });
  console.log("全局状态生成", simpleglobalstatestore);
  return newobjtoreturn;
}
