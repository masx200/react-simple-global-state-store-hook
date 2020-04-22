import { useState, useCallback, useEffect } from "react";

function useGlobalStore(name) {
    return useGlobalStoreold({
        [name]: "",
    })[name];
}

function isfunction(a) {
    return "function" === typeof a;
}

function changeState(keyname, newvalue) {
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
        console.log(
            "\u5168\u5c40\u72b6\u6001\u6539\u53d8",
            simpleglobalstatestore
        );
        temptarget.dispatchEvent(new Event(eventname));
    }
}

function jsonparsestringify(o) {
    return JSON.parse(JSON.stringify(o));
}

function getGlobalStates() {
    return newobjjson(simpleglobalstatestore);
}

function jsondeepequal(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

function isinvalidstate(newstate) {
    return (
        "undefined" === typeof newstate ||
        isfunction(newstate) ||
        newstate === null ||
        "symbol" === typeof newstate
    );
}

const temptarget = new EventTarget();

const simpleglobalstatestore = {};

function newobjjson(obj) {
    if (typeof obj !== "object") {
        throw new TypeError("The argument passed in must be an 'object' type!");
    }
    return jsonparsestringify(obj);
}

function isplainobject(o) {
    return (
        typeof o === "object" &&
        Object.prototype.toString.call(o) === "[object Object]"
    );
}

function useGlobalStoreold(jsonobject) {
    if (!isplainobject(jsonobject)) {
        throw Error("invalid object");
    }
    const newjsonobj = newobjjson(jsonobject);
    const newobjtoreturn = {};
    Object.keys(newjsonobj).forEach((key) => {
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
            (newstate) => {
                if (isfunction(newstate)) {
                    newstate = newstate.call(undefined, state);
                }
                if (isinvalidstate(newstate)) {
                    throw Error("invalid state");
                }
                if (!jsondeepequal(newstate, state)) {
                    simpleglobalstatestore[key] = jsonparsestringify(newstate);
                    console.log(
                        "\u5168\u5c40\u72b6\u6001\u6539\u53d8",
                        simpleglobalstatestore
                    );
                    temptarget.dispatchEvent(new Event(eventname));
                }
            },
        ];
    });
    return newobjtoreturn;
}

function initGlobalState(jsonobject) {
    if (!isplainobject(jsonobject)) {
        throw Error("invalid object");
    }
    const newjsonobj = newobjjson(jsonobject);
    const newobjtoreturn = {};
    Object.keys(newjsonobj).forEach((key) => {
        if ("undefined" === typeof simpleglobalstatestore[key]) {
            simpleglobalstatestore[key] = newjsonobj[key];
        }
        newobjtoreturn[key] = simpleglobalstatestore[key];
    });
    console.log("\u5168\u5c40\u72b6\u6001\u751f\u6210", simpleglobalstatestore);
    return newobjtoreturn;
}

export { changeState, getGlobalStates, initGlobalState, useGlobalStore };
//# sourceMappingURL=index.js.map
