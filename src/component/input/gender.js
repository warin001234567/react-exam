const Gender = (props) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center">
      <label className="pr-2">Gender :</label>
      <div className="flex flex-wrap">
        <div className="flex items-center justify-start mr-2">
          <input
            onChange={(e) => props.onChange(e, props.inputName)}
            value="Male"
            type="radio"
            name="sex"
            checked={props.value === "Male" ? true : false}
          ></input>
          <label>Male</label>
        </div>
        <div className="flex items-center justify-center mr-2">
          <input
            onChange={(e) => props.onChange(e, props.inputName)}
            value="Female"
            type="radio"
            name="sex"
            checked={props.value === "Female" ? true : false}
          ></input>
          <label>Female</label>
        </div>
        <div className="flex items-center justify-center">
          <input
            onChange={(e) => props.onChange(e, props.inputName)}
            value="Unisex"
            type="radio"
            name="sex"
            checked={props.value === "Unisex" ? true : false}
          ></input>
          <label>Unisex</label>
        </div>
      </div>
    </div>
  );
};

export default Gender;
