/* eslint-disable no-unused-vars */
import useGlobalstate from "./react-simple-global-state-store";
// alert("hello world");
import React from "react";
import { render } from "react-dom";
function Htest() {
  //   let {
  //     testname: [testname, settestname],
  //     number: [testnamnum, settestnamnum]
  //   } = useState({ testname: "helloworld", number: 78546 });
  //   let [testname, settestname] = useState("helloworld");
  let {
    number: [number, setnumber]
  } = useGlobalstate({ number: 78546 });
  //   let [number, setnumber] = useState(78546);
  let {
    testname: [testname, settestname]
  } = useGlobalstate({ testname: "helloworld1" });
  return (
    <div>
      <h1>test</h1>

      <p>
        testname:
        {testname}
      </p>
      <button
        onClick={() => {
          settestname(testname.slice(testname.length / 2) + "change");
        }}
      >
        修改testname
      </button>
      <p>
        number:
        {number}
      </p>
      <button
        onClick={() => {
          setnumber(number / 3);
        }}
      >
        修改number
      </button>
    </div>
  );
}
function 主页() {
  //   let {
  //     testname: [testname, settestname],
  //     testnamnum: [testnamnum, settestnamnum],
  //     flag: [flag, setflag]
  //   } = useState({
  //     testname: "helloworld",
  //     testnamnum: 212546,
  //     flag: true
  //   });
  //   use全局状态(123);
  let {
    number: [number, setnumber]
  } = useGlobalstate({ number: 212546 });

  let {
    testname: [testname, settestname]
  } = useGlobalstate({ testname: "helloworld2" });
  //   let [testname, settestname] = useState("helloworld");
  //   let [testnamnum, settestnamnum] = useState(212546);
  //   let {
  //     flag: [flag, setflag]
  //   } = useGlobalstate({ flag: "rue" });
  return (
    <div>
      <h1>hello world</h1>
      <p>
        testname:
        {testname}
      </p>
      <button
        onClick={() => {
          settestname(testname + "test");
        }}
      >
        修改testname
      </button>
      <p>
        number:
        {number}
      </p>{" "}
      <button
        onClick={() => {
          setnumber(number * 2);
        }}
      >
        修改number
      </button>
      {/* <p>
        flag:
        {flag ? "true" : "false"}
      </p>
      <button
        onClick={() => {
          setflag(!flag);
        }}
      >
        修改flag
      </button> */}
      <hr />
      <Htest />
    </div>
  );
}

render(<主页 />, document.getElementById("root"));
