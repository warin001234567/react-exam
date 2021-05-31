import MobileSelector from "./mobileSelector";

const MobilePhone = (props) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
        <label>
          Mobile Phone:<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-row space-x-2 items-center">
          <MobileSelector
            option={props.item}
            onChange={props.onChange}
            inputName="mobileNation"
            ErrorMsg={props.ErrorMsg}
            value={props.valueSelector}
          />
          <span>-</span>
          <input
            placeholder="xxxxxxxxxx"
            value={props.value}
            maxLength={10}
            onChange={(e) => props.onChange(e, "mobile")}
            type="text"
            className={`px-3 rounded-lg w-32 ${
              props.ErrorMsg !== "" ? "border-red-600" : ""
            }`}
          ></input>
        </div>
      </div>
      <span className="text-xs text-red-600 ml-14">{props.ErrorMsg}</span>
    </div>
  );
};

export default MobilePhone;
