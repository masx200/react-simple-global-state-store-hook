export declare function useGlobalStore(name: string): [any, Dispatch];
declare type Dispatch = (value: any) => void;
export declare function changeState(keyname: string, newvalue: any): void;
export declare function getGlobalStates(name: string): any;
export declare function initGlobalState(jsonobject: {
    [key: string]: any;
}): {
    [key: string]: any;
};
export {};
