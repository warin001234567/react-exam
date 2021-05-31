const DatePicker = (props) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <label className="pr-2">
          {props.title + ":"}
          <span className="text-red-500">{props.require ? "*" : " "}</span>
        </label>
        <input
          type="date"
          value={props.value}
          className={`px-3 rounded-lg flex ${
            props.ErrorMsg !== "" ? "border-red-600" : ""
          }`}
          onChange={(e) => props.onChange(e, props.inputName)}
        ></input>
      </div>
      <span className="text-xs text-red-600 ml-auto">{props.ErrorMsg}</span>
    </div>
  );
};

export default DatePicker;
