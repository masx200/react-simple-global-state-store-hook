export declare function useGlobalStore(name: string): [any, Function];
export declare function changeState(keyname: string, newvalue: any): void;
export declare function getGlobalStates(): {
    [key: string]: any;
};
export declare function initGlobalState(jsonobject: {
    [key: string]: any;
}): {
    [key: string]: any;
};
