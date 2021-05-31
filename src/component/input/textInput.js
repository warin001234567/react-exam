const textInput = (props) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <label className="pr-2">
          {props.title ? props.title + ":" : ""}
          <span className="text-red-500">{props.require ? "*" : " "}</span>
        </label>
        <input
          placeholder={props.placeHolder}
          onChange={(e) => props.onChange(e, props.inputName)}
          value={props.value}
          type={props.type}
          className={`px-3 rounded-lg flex ${
            props.sm !== undefined ? "w-32" : ""
          } ${props.md !== undefined ? "sm:w-64" : ""} ${
            props.ErrorMsg !== "" ? "border-red-600" : ""
          }`}
        ></input>
      </div>
      <span className="text-xs text-red-600 ml-16">{props.ErrorMsg}</span>
    </div>
  );
};
export default textInput;
