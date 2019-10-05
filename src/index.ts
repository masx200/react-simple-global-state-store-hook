export function useGlobalStore(name){
 returm useGlobalStoreold({name:undefined})[name]
}
function isfunction(a){return "function"===typeof a}

export function changeState(keyname,newvalue){

const key=keyname
let newstate=newvalue


const oldstate=simpleglobalstatestore[key]
const state=oldstate
if(isfunction(newstate)){
newstate=newstate.call(undefined,state)
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
function jsonparsestringify(o) {
  return JSON.parse(JSON.stringify(o));
}
export function getGlobalStates() {
  return newobjjson(simpleglobalstatestore);
}
import { useState, useEffect, useCallback } from "react";
function jsondeepequal(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
function isinvalidstate(newstate) {
  return (
    "undefined" === typeof newstate ||
    "function" === typeof newstate ||
    newstate === null ||
    "symbol" === typeof newstate
  );
}
const temptarget = new EventTarget();
const simpleglobalstatestore = {};
function newobjjson(obj) {
  if (typeof obj !== "object") {
    throw new TypeError("传入的参数必须是个object!");
  }
  return jsonparsestringify(obj);
}
function isplainobject(o) {
  return (
    typeof o === "object" &&
    Object.prototype.toString.call(o) === "[object Object]"
/* &&
    o.__proto__ === Object.prototype*/
  );
}

function useGlobalStoreold(jsonobject) {
  if (!isplainobject(jsonobject)) {
    throw Error("invalid object");
  }
  const newjsonobj = newobjjson(jsonobject);
  const newobjtoreturn = {};
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
      newstate => {
if(isfunction(newstate)){
newstate=newstate.call(undefined,state)
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
export function initGlobalState(jsonobject) {
  if (!isplainobject(jsonobject)) {
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
