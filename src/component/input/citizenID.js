import { useRef, useEffect, useState } from "react";
const CitizenID = (props) => {
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [thirdInput, setThirdInput] = useState("");
  const [forthInput, setForthInput] = useState("");
  const [fifthInput, setFifthInput] = useState("");
  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const input4 = useRef();
  const input5 = useRef();

  const onChangeHandler = (event) => {
    const { maxLength, value, name } = event.target;
    const [fieldName, fieldIndex] = name.split("-");
    switch (fieldIndex) {
      case "1":
        setFirstInput(value);
        break;
      case "2":
        setSecondInput(value);
        break;
      case "3":
        setThirdInput(value);
        break;
      case "4":
        setForthInput(value);
        break;
      case "5":
        setFifthInput(value);
        break;

      default:
        break;
    }

    if (value.length >= maxLength) {
      if (parseInt(fieldIndex, 10) < 6) {
        const nextSibling = document.querySelector(
          `input[name=citizen-${parseInt(fieldIndex, 10) + 1}]`
        );
        if (nextSibling !== null) {
          nextSibling.focus();
        }
      }
    }
    sendDataToParent();
  };

  const sendDataToParent = () => {
    let data =
      input1.current.value +
      "-" +
      input2.current.value +
      "-" +
      input3.current.value +
      "-" +
      input4.current.value +
      "-" +
      input5.current.value;
    props.onChange(data, props.inputName);
  };

  useEffect(() => {
    const [temp1, temp2, temp3, temp4, temp5] = props.value.split("-");
    setFirstInput(temp1 ? temp1 : "");
    setSecondInput(temp2 ? temp2 : "");
    setThirdInput(temp3 ? temp3 : "");
    setForthInput(temp4 ? temp4 : "");
    setFifthInput(temp5 ? temp5 : "");
  }, [props.value]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <label className="pr-2">
          CitizenID :
          <span className="text-red-500">{props.require ? "*" : " "}</span>
        </label>
        <div className="space-x-1">
          <input
            name="citizen-1"
            placeholder="x"
            value={firstInput}
            ref={input1}
            maxLength={1}
            type="text"
            className={`px-3 rounded-lg mt-2 w-9 ml-1 ${
              props.ErrorMsg !== "" ? "border-red-600" : ""
            }`}
            onChange={(e) => onChangeHandler(e)}
          ></input>
          <span>-</span>
          <input
            placeholder="xxxx"
            ref={input2}
            value={secondInput}
            name="citizen-2"
            maxLength={4}
            type="text"
            className={`px-3 rounded-lg mt-2 w-16 ${
              props.ErrorMsg !== "" ? "border-red-600" : ""
            }`}
            onChange={(e) => onChangeHandler(e)}
          ></input>
          <span>-</span>
          <input
            placeholder="xxxxx"
            ref={input3}
            name="citizen-3"
            value={thirdInput}
            maxLength={5}
            type="text"
            className={`px-3 rounded-lg mt-2 w-20 ${
              props.ErrorMsg !== "" ? "border-red-600" : ""
            }`}
            onChange={(e) => onChangeHandler(e)}
          ></input>
          <span>-</span>
          <input
            placeholder="xx"
            ref={input4}
            name="citizen-4"
            value={forthInput}
            maxLength={2}
            type="text"
            className={`px-3 rounded-lg mt-2 w-12 ${
              props.ErrorMsg !== "" ? "border-red-600" : ""
            }`}
            onChange={(e) => onChangeHandler(e)}
          ></input>
          <span>-</span>
          <input
            placeholder="x"
            ref={input5}
            name="citizen-5"
            value={fifthInput}
            maxLength={1}
            type="text"
            className={`rounded-lg mt-2 w-9 ${
              props.ErrorMsg !== "" ? "border-red-600" : ""
            }`}
            onChange={(e) => onChangeHandler(e)}
          ></input>
        </div>
      </div>
      <span className="text-red-600 text-xs ml-16">{props.ErrorMsg}</span>
    </div>
  );
};

export default CitizenID;
