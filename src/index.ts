import { useCallback, useEffect, useState } from "react";
export function useGlobalStore(name: string): [any, Function] {
  return useGlobalStoreold({ [name]: undefined })[name];
}
function isfunction(a: any): a is Function {
  return "function" === typeof a;
}
export function changeState(keyname: string, newvalue: any) {
  const key = keyname;
  const eventname = key;
  let newstate = newvalue;
  const oldstate = simpleglobalstatestore[key];
  const state = oldstate;
  if (isfunction(newstate)) {
    newstate = newstate.call(undefined, state);
  }
  if (isinvalidstate(newstate)) {
    throw Error("invalid state");
  }
  if (!jsondeepequal(newstate, state)) {
    simpleglobalstatestore[key] = jsonparsestringify(newstate);
    console.log("全局状态改变", simpleglobalstatestore);
    temptarget.dispatchEvent(new Event(eventname));
  }
}
"use strict";
function jsonparsestringify(o: { [key: string]: any }): { [key: string]: any } {
  return JSON.parse(JSON.stringify(o));
}
export function getGlobalStates() {
  return newobjjson(simpleglobalstatestore);
}

function jsondeepequal(a: any, b: any) {
  return JSON.stringify(a) === JSON.stringify(b);
}
function isinvalidstate(newstate: any) {
  return (
    "undefined" === typeof newstate ||
    isfunction(newstate) ||
    newstate === null ||
    "symbol" === typeof newstate
  );
}
const temptarget = new EventTarget();
const simpleglobalstatestore: { [key: string]: any } = {};
function newobjjson(obj: { [key: string]: any }): { [key: string]: any } {
  if (typeof obj !== "object") {
    throw new TypeError("The argument passed in must be an 'object' type!");
  }
  return jsonparsestringify(obj);
}
function isplainobject(o: any) {
  return (
    typeof o === "object" &&
    Object.prototype.toString.call(o) === "[object Object]"
  );
}
function useGlobalStoreold(jsonobject: {
  [key: string]: any;
}): { [key: string]: [any, Function] } {
  if (!isplainobject(jsonobject)) {
    throw Error("invalid object");
  }
  const newjsonobj = newobjjson(jsonobject);
  const newobjtoreturn: { [key: string]: [any, Function] } = {};
  Object.keys(newjsonobj).forEach(key => {
    const eventname = key;
    if ("undefined" === typeof simpleglobalstatestore[key]) {
      simpleglobalstatestore[key] = newjsonobj[key];
    }
    const initialstate =
      "undefined" !== typeof simpleglobalstatestore[key]
        ? simpleglobalstatestore[key]
        : newjsonobj[key];
    if (isinvalidstate(initialstate)) {
      throw Error("invalid state");
    }
    const [state, setstate] = useState(jsonparsestringify(initialstate));
    const eventhandler = useCallback(() => {
      const newstate = simpleglobalstatestore[key];
      if (!jsondeepequal(newstate, state))
        setstate(jsonparsestringify(newstate));
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
      (newstate: any) => {
        if (isfunction(newstate)) {
          newstate = newstate.call(undefined, state);
        }
        if (isinvalidstate(newstate)) {
          throw Error("invalid state");
        }
        if (!jsondeepequal(newstate, state)) {
          simpleglobalstatestore[key] = jsonparsestringify(newstate);
          console.log("全局状态改变", simpleglobalstatestore);
          temptarget.dispatchEvent(new Event(eventname));
        }
      }
    ];
  });
  return newobjtoreturn;
}
export function initGlobalState(jsonobject: { [key: string]: any }) {
  if (!isplainobject(jsonobject)) {
    throw Error("invalid object");
  }
  const newjsonobj = newobjjson(jsonobject);
  const newobjtoreturn: { [key: string]: any } = {};
  Object.keys(newjsonobj).forEach(key => {
    if ("undefined" === typeof simpleglobalstatestore[key]) {
      simpleglobalstatestore[key] = newjsonobj[key];
    }
    newobjtoreturn[key] = simpleglobalstatestore[key];
  });
  console.log("全局状态生成", simpleglobalstatestore);
  return newobjtoreturn;
}
