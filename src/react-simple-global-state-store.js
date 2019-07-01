import { useState, useEffect } from "react";
const reactsimpleglobalstatestore = {};
function newobjjson(obj) {
  if (typeof obj !== "object") {
    throw new TypeError("传入的参数必须是个object!");
  }
  return JSON.parse(JSON.stringify(obj));
}
export default function(jsonobject) {
  const newjsonobj = newobjjson(jsonobject);
  var newobjtoreturn = {};
  Object.keys(newjsonobj).forEach(key => {
    const eventname = "globalstatechange-" + key;
    let [state, setstate] = useState(newjsonobj[key]);
    if ("undefined" === typeof reactsimpleglobalstatestore[key]) {
      reactsimpleglobalstatestore[key] = newjsonobj[key];
    }
    const eventhandler = () => {
      var newstate = reactsimpleglobalstatestore[key];
      if (newstate !== state) {
        console.log("接受事件" + eventname);
        setstate(newstate);
      }
    };
    useEffect(() => {
      window.addEventListener(eventname, eventhandler);
      return () => {
        window.removeEventListener(eventname, eventhandler);
      };
    }, []);
    newobjtoreturn[key] = [
      state,
      newstate => {
        if (newstate !== state) {
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
