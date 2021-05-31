import Select from "react-select";
import SelectorOption from "./selectorOption";

const MobileSelector = (props) => {
  console.log("MobileSelector", props.value);
  return (
    <div className="flex flex-col w-32">
      <Select
        value={props.option.filter(
          (option) => option.value === props.value.value
        )}
        className={`rounded-lg border ${
          props.ErrorMsg !== "" ? "border-red-600" : "border-black"
        }`}
        options={SelectorOption(props.option)}
        onChange={(e) => props.onChange(e, "mobileNation")}
      />
    </div>
  );
};

export default MobileSelector;
