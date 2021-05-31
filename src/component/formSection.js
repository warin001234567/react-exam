import { useState, useEffect } from "react";
import TextInput from "./input/textInput";
import Selector from "./input/selector";
import DatePicker from "./input/datePicker";
import CitizenID from "./input/citizenID";
import Gender from "./input/gender";
import MobilePhone from "./input/mobilePhone";
import { useDispatch } from "react-redux";
import { addDataToState, updateData } from "../store/userSlice";

const titleItem = [
  { value: "-- Please Select --" },
  { value: "Mr." },
  { value: "Ms." },
  { value: "Miss" },
  { value: "Mrs." },
];

const initialState = {
  title: "",
  firstname: "",
  lastname: "",
  birthday: "",
  nationality: "",
  citizenId: "",
  gender: "",
  mobileNation: {
    alfa: "",
    value: "",
  },
  mobile: "",
  passportNo: "",
  expectSalary: 0,
};

const FormSection = (props) => {
  // Error
  const [titleError, setTitleError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [birthdayError, setBirthdayError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [expectSalaryError, setExpectSalaryError] = useState("");
  const [passportNoError, setPassportNoError] = useState("");
  const [citizenIdError, setCitizenIdError] = useState("");
  const [editMode, setEditMode] = useState(false);
  // form input state
  const [userData, setUserData] = useState(initialState);

  //for using redux
  const dispatch = useDispatch();

  const validateForm = () => {
    var patt = new RegExp("^[A-Z a-z]{1,2}[0-9]{6,7}$");
    let countError = 0;
    setTitleError("");
    setFirstnameError("");
    setLastnameError("");
    setBirthdayError("");
    setMobileError("");
    setExpectSalaryError("");
    setPassportNoError("");
    setCitizenIdError("");

    if (userData.title === "" || userData.title === "-- Please Select --") {
      countError++;
      setTitleError("Please Select Title");
    }
    if (userData.firstname.length < 1) {
      countError++;
      setFirstnameError("Firstname cannot be blank");
    }
    if (!isNaN(userData.firstname) && userData.firstname.length > 0) {
      countError++;
      setFirstnameError("Firstname cannot be number");
    }
    if (userData.lastname.length < 1) {
      countError++;
      setLastnameError("Lastname cannot be blank");
    }
    if (!isNaN(userData.lastname) && userData.lastname.length > 0) {
      countError++;
      setLastnameError("Firstname cannot be number");
    }
    if (userData.birthday === "") {
      countError++;
      setBirthdayError("Please select birthday");
    }
    if (
      userData.mobile.length < 9 ||
      userData.mobile.length > 10 ||
      userData.mobileNation.value === "" ||
      (isNaN(userData.mobile) && userData.mobile.length > 0)
    ) {
      countError++;
      setMobileError("Incorect Phone number");
    }
    if (userData.expectSalary <= 0) {
      countError++;
      setExpectSalaryError("Expect salary cannot be zero or negative number");
    }
    if (!patt.test(userData.passportNo) && userData.passportNo !== "") {
      countError++;
      setPassportNoError("Incorect Passport No.");
    }
    if (userData.citizenId.length > 0 && userData.citizenId.length < 17) {
      countError++;
      setCitizenIdError("Please complete CitizenId");
    }
    if (countError > 0) {
      return false;
    }
    return true;
  };

  const inputChangeHandler = (event, input) => {
    if (input === "citizenId") {
      setUserData((prevState) => {
        return {
          ...prevState,
          [input]: event,
        };
      });
    } else if (input !== "mobileNation") {
      setUserData((prevState) => {
        return {
          ...prevState,
          [input]: event.target.value,
        };
      });
    } else {
      setUserData((prevState) => {
        return {
          ...prevState,
          [input]: {
            alfa: event.alfa,
            value: event.value,
          },
        };
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (!editMode) {
      let dateNow = Date.now().toString();
      let resultData = { id: dateNow, ...userData, select: false };
      if (resultData.nationality === "-- Please Select --") {
        resultData.nationality = "";
      }
      if (isValid) {
        dispatch(addDataToState(resultData));
        setUserData(initialState);
      }
    } else {
      let resultData = userData;
      if (resultData.nationality === "-- Please Select --") {
        resultData.nationality = "";
      }
      if (isValid) {
        dispatch(updateData(userData));
        setUserData(initialState);
        setEditMode(false);
      }
    }
    props.setEditData(null);
  };

  useEffect(() => {
    if (props.editData) {
      setUserData({ ...props.editData });
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [props.editData]);

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col space-y-2 mt-2 justify-center sm:flex-row sm:space-y-0 sm:space-x-2 sm:justify-start">
        <Selector
          title="Title"
          item={titleItem}
          require
          inputName="title"
          value={userData.title}
          ErrorMsg={titleError}
          onChange={inputChangeHandler}
        />
        <TextInput
          type="text"
          placeHolder="Firstname"
          title="Firstname"
          inputName="firstname"
          onChange={inputChangeHandler}
          ErrorMsg={firstnameError}
          value={userData.firstname}
          require
        />
        <TextInput
          type="text"
          placeHolder="Lastname"
          title="Lastname"
          inputName="lastname"
          onChange={inputChangeHandler}
          value={userData.lastname}
          ErrorMsg={lastnameError}
          require
        />
      </div>
      <div className="flex flex-col space-y-2 mt-2 justify-center sm:flex-row sm:space-y-0 sm:justify-start sm:space-x-2 ">
        <DatePicker
          title="Birthday"
          require
          value={userData.birthday}
          onChange={inputChangeHandler}
          ErrorMsg={birthdayError}
          inputName="birthday"
        />
        <Selector
          title="Nationality"
          item={props.nationItem}
          inputName="nationality"
          value={userData.nationality}
          onChange={inputChangeHandler}
        />
      </div>
      <div className="flex flex-col mt-2 space-y-2 justify-center ">
        <CitizenID
          onChange={inputChangeHandler}
          inputName="citizenId"
          ErrorMsg={citizenIdError}
          value={userData.citizenId}
        />
        <Gender
          onChange={inputChangeHandler}
          inputName="gender"
          value={userData.gender}
        />
      </div>
      <div className="flex flex-col mt-2 space-y-2 justify-center">
        <MobilePhone
          item={props.phoneCode}
          onChange={inputChangeHandler}
          ErrorMsg={mobileError}
          value={userData.mobile}
          valueSelector={userData.mobileNation}
        />
      </div>
      <div className="flex flex-col mt-2 space-y-2 justify-center">
        <TextInput
          type="text"
          placeHolder="A123456 or AA1234567"
          title="Passport No"
          inputName="passportNo"
          onChange={inputChangeHandler}
          ErrorMsg={passportNoError}
          value={userData.passportNo}
          md
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end  mt-2 space-y-2">
        <div className="flex items-center space-x-2">
          <TextInput
            type="number"
            title="Expected Salary"
            inputName="expectSalary"
            placeHolder="xxxxx"
            value={userData.expectSalary}
            onChange={inputChangeHandler}
            ErrorMsg={expectSalaryError}
            require
          />
          <span>THB</span>
        </div>
        <div className="mx-auto sm:mx-0">
          {editMode ? (
            <div className="space-x-2">
              <button
                className="bg-transparent border border-red-500 text-red-600 rounded font-semibold hover:bg-red-500 hover:text-white py-2 px-2"
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setUserData(initialState);
                  props.setEditData(null);
                }}
              >
                Cancle
              </button>
              <button
                className="bg-transparent border border-blue-500 text-blue-600 rounded font-semibold hover:bg-blue-500 hover:text-white py-2 px-4"
                type="submit"
              >
                Edit
              </button>
            </div>
          ) : (
            <button
              className="bg-transparent border border-blue-500 text-blue-600 rounded font-semibold hover:bg-blue-500 hover:text-white py-2 px-4"
              type="submit"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default FormSection;
