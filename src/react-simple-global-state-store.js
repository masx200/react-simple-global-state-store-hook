import { useState, useEffect, useCallback } from "react";
const reactsimpleglobalstatestore = {};
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
export default function(jsonobject) {
  if (!isobject(jsonobject)) {
    throw Error("invalid object");
  }
  // &&
  const newjsonobj = newobjjson(jsonobject);
  const newobjtoreturn = {};
  Object.keys(newjsonobj).forEach(key => {
    const eventname = "globalstatechange-" + key;
    const [state, setstate] = useState(newjsonobj[key]);
    if ("undefined" === typeof reactsimpleglobalstatestore[key]) {
      reactsimpleglobalstatestore[key] = newjsonobj[key];
    }
    const eventhandler = useCallback(() => {
      const newstate = reactsimpleglobalstatestore[key];
      console.log("接受事件 " + eventname);
      setstate(newstate);
    }, []);
    useEffect(() => {
      window.addEventListener(eventname, eventhandler);
      window.dispatchEvent(new Event(eventname));
      return () => {
        window.removeEventListener(eventname, eventhandler);
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

        if (
          JSON.parse(JSON.stringify(newstate)) !==
          JSON.parse(JSON.stringify(state))
        ) {
          reactsimpleglobalstatestore[key] = newstate;
          console.log("触发事件 " + eventname);
          console.log("全局状态改变", reactsimpleglobalstatestore);
          window.dispatchEvent(new Event(eventname));
        }
      }
    ];
  });
  return newobjtoreturn;
}
