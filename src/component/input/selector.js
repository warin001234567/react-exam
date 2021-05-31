const Seletor = (props) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <label className="pr-2">
          {props.title ? props.title + ":" : ""}
          <span className="text-red-500">{props.require ? "*" : " "}</span>
        </label>
        <select
          className={`rounded-lg flex ${
            props.ErrorMsg !== "" && props.ErrorMsg !== undefined
              ? "border-red-600"
              : ""
          }`}
          onChange={(e) => props.onChange(e, props.inputName)}
          value={props.value}
          select={props.value}
        >
          {props.item.map((item, index) => {
            return (
              <option key={index} value={item.value}>
                {item.value}
              </option>
            );
          })}
        </select>
      </div>
      <span className="text-xs text-red-600 ml-auto">{props.ErrorMsg}</span>
    </div>
  );
};

export default Seletor;
