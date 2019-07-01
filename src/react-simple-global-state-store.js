import { useState, useEffect } from "react";
const reactsimpleglobalstatestore = {};

function newobjjson(obj) {
  //   if (typeof obj !== "object") {
  //     throw new Error("传入的参数必须是个object!");
  //   }
  return JSON.parse(JSON.stringify(obj));
}
export default function(jsonobject) {
  //   if (typeof jsonobject !== "object") {
  //     throw new Error("传入的参数必须是个object!");
  //   } else {
  const newjsonobj = newobjjson(jsonobject);
  //   console.log("输入值", newjsonobj);
  var newobjtoreturn = {};
  Object.keys(newjsonobj).forEach(key => {
    const eventname = "globalstatechange-" + key;
    let [state, setstate] = useState(newjsonobj[key]);
    if ("undefined" === typeof reactsimpleglobalstatestore[key]) {
      reactsimpleglobalstatestore[key] = newjsonobj[key];
    }
    // window.dispatchEvent("globalstatechange");
    const eventhandler = () => {
      var newstate = reactsimpleglobalstatestore[key];
      if (newstate !== state) {
        // console.log(state, newstate);
        console.log("接受事件" + eventname);
        //   console.log(e);

        // console.log("全局状态改变", reactsimpleglobalstatestore);

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
          //   console.log(state, newstate);
          reactsimpleglobalstatestore[key] = newstate;
          console.log("触发事件 " + eventname);
          console.log("全局状态改变", reactsimpleglobalstatestore);
          window.dispatchEvent(new Event(eventname));
        }
      }
    ];
  });
  //   console.log("输出值", newobjtoreturn);
  return newobjtoreturn;
  //   }
}

// function(jsonobject) {
//   if (typeof jsonobject !== "object") {
//     throw new Error("传入的参数必须是个object!");
//     // return;
//   } else {
//     var newobjtoreturn = {};
//     const newjsonobj = newobjjson(jsonobject);
//     console.log("输入值", newjsonobj);
//     Object.keys(newjsonobj).forEach(key => {
//       //   console.log(key, newjsonobj[key]);
//       if ("undefined" === typeof reactsimpleglobalstatestore[key]) {
//         var arr = useState(newjsonobj[key]);
//         reactsimpleglobalstatestore[key] = [];
//         reactsimpleglobalstatestore[key][0] = arr[0];
//         reactsimpleglobalstatestore[key][1] = newstatevalue => {
//           reactsimpleglobalstatestore[key][0] = newstatevalue;
//           console.log("全局状态改变", reactsimpleglobalstatestore);
//           reactsimpleglobalstatestore[key][2](newstatevalue);
//         };
//         reactsimpleglobalstatestore[key][2] = arr[1];

//         // newstatevalue => {
//         //   reactsimpleglobalstatestore[key][0] = newstatevalue;
//         //   arr[1](newstatevalue);
//         // };
//       } else {
//         console.warn(
//           "全局状态已经存在",
//           key,
//           reactsimpleglobalstatestore[key][0]
//         );
//       }
//       newobjtoreturn[key] = reactsimpleglobalstatestore[key];
//     });

//     console.log("输出值", newobjtoreturn);
//     console.log("全局状态合集", reactsimpleglobalstatestore);
//     /* 返回值包含函数不能转成新的json! */
//     return newobjtoreturn;
//   }
// }
