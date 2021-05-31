import "./App.css";

import { useState, useEffect } from "react";
import Loading from "./component/loading";
import { deleteSingleDataFromState } from "./store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import FormSection from "./component/formSection";
import data from "./countries";
import phone from "./phoneCode";

function App() {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userList, setUserList] = useState(user);
  const [selectAll, setSelectAll] = useState(false);
  const [nationItem, setNationItem] = useState(null);
  const [phoneCode, setPhoneCode] = useState(null);
  const [editData, setEditData] = useState(null);
  const [parginationPage, setParginationPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPage, setAllPage] = useState(1);

  const addDataToRemove = (temp, event) => {
    let index = userList.findIndex((x) => x.id === temp.id);
    if (index === -1) console.log("error");
    else {
      let newValue = JSON.parse(JSON.stringify(userList[index]));
      newValue.select = event.target.checked;
      setUserList((prevState) => [
        ...prevState.slice(0, index),
        newValue,
        ...prevState.slice(index + 1),
      ]);
    }
  };

  const selectAllHandler = (event) => {
    let newValue = userList.map((item) => {
      let temp = JSON.parse(JSON.stringify(item));
      temp.select = event.target.checked;
      return temp;
    });
    setUserList([...newValue]);
  };

  const deleteSelected = () => {
    userList.map((item) => {
      if (item.select) {
        dispatch(deleteSingleDataFromState(item.id));
      }
      return null;
    });
    setSelectAll(false);
  };

  const getAllPage = () => {
    console.log("user.length", Math.ceil(user.length / 5));
    let temp = [];
    for (let i = 0; i < Math.ceil(user.length / 5); i++) {
      temp.push(
        <div className="pagination" key={i}>
          <button
            className={`${
              currentPage == i + 1
                ? "pagination-active-text"
                : "pagination-text"
            }`}
            onClick={() => {
              setCurrentPage(i + 1);
            }}
            disabled={currentPage == i + 1 ? true : false}
          >
            {i + 1}
          </button>
        </div>
      );
    }
    setParginationPage(temp);
    if (Math.ceil(user.length / 5)) {
      setAllPage(Math.ceil(user.length / 5));
    } else {
      setAllPage(1);
    }
  };

  useEffect(() => {
    const prepareNation = () => {
      let result = data.map((item) => {
        return { value: item.nationality };
      });
      result.unshift({ value: "-- Please Select --" });
      setNationItem(result);
      setLoading(false);
    };

    const preparePhone = () => {
      let phoneNum = [];
      phone.forEach((item) => {
        phoneNum.push({ value: item.dial_code, alfa: item.code });
      });
      phoneNum.sort((a, b) => {
        return a.value - b.value;
      });
      setPhoneCode(phoneNum);
    };
    prepareNation();
    preparePhone();
  }, []);

  useEffect(() => {
    setUserList(user.slice((currentPage - 1) * 5, currentPage * 5));
    getAllPage();
  }, [user]);

  useEffect(() => {
    console.log(currentPage);
    setUserList(user.slice((currentPage - 1) * 5, currentPage * 5));
    getAllPage();
  }, [currentPage]);

  return (
    <div className="bg-indigo-50 min-h-screen w-screen p-5">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col">
          {/* form */}
          <div className="border border-gray-500 p-5">
            <FormSection
              setLoading={setLoading}
              nationItem={nationItem}
              phoneCode={phoneCode}
              editData={editData}
              setEditData={setEditData}
            />
          </div>
          {/* select and pagination */}
          <div className="mt-5 flex flex-row  items-center justify-between">
            <div className="flex flex-row items-center justify-center space-x-1">
              <label className="inline-flex items-center">
                <input
                  checked={selectAll}
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  onChange={(e) => {
                    setSelectAll(!selectAll);
                    selectAllHandler(e);
                  }}
                />
                <span className="ml-2 text-gray-700">Select All</span>
              </label>
              <button
                className="bg-transparent border border-red-500 text-red-600 py-1 px-2 rounded hover:bg-red-500 hover:text-white"
                onClick={() => {
                  deleteSelected();
                }}
              >
                Delete
              </button>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="space-x-2 flex flex-row sm:hidden">
                <button className="bg-transparent border border-blue-500 text-blue-600 rounded font-semibold hover:bg-blue-500 hover:text-white py-1 px-2">
                  Prev
                </button>
                <button className="bg-transparent border border-blue-500 text-blue-600 rounded font-semibold hover:bg-blue-500 hover:text-white py-1 px-2">
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:justify-end">
                <div className="pagination rounded rounded-r-none">
                  <button
                    href="#"
                    className={`${
                      currentPage === 1
                        ? "pagination-active-text"
                        : "pagination-text"
                    }`}
                    onClick={() => {
                      setCurrentPage(currentPage - 1);
                    }}
                    disabled={currentPage === 1 ? true : false}
                  >
                    Prev
                  </button>
                </div>

                {/* <div className="pagination"> */}
                {/* <button className="pagination-active-text">1</button> */}
                {parginationPage}
                {/* </div> */}
                <div className="pagination rounded rounded-l-none">
                  <button
                    className={`${
                      allPage === currentPage
                        ? "pagination-active-text"
                        : "pagination-text"
                    }`}
                    onClick={() => {
                      setCurrentPage(currentPage + 1);
                    }}
                    disabled={currentPage === allPage ? true : false}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Table */}
          <div className="mt-5 overflow-hidden">
            <table className="w-full table-auto">
              <thead>
                <tr className="border border-black">
                  <th className="text-left pl-5">Name</th>
                  <th className="hidden sm:table-cell">Gender</th>
                  <th className="hidden sm:table-cell">Mobile Phone</th>
                  <th className="hidden sm:table-cell">Nationality</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userList.map((item) => {
                  return (
                    <tr
                      className="border-l border-r border-black"
                      key={item.id}
                    >
                      <td>
                        <div className="flex flex-row">
                          <input
                            checked={item.select}
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 rounded mr-1"
                            onChange={(e) => {
                              addDataToRemove(item, e);
                            }}
                          />
                          <span>{item.firstname + " " + item.lastname}</span>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell text-center">
                        {item.gender}
                      </td>
                      <td className="hidden sm:table-cell text-center">
                        {item.mobile}
                      </td>
                      <td className="hidden sm:table-cell text-center">
                        {item.nationality}
                      </td>
                      <td>
                        <div className="flex flex-row space-x-1 justify-end">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => {
                              setEditData(item);
                            }}
                          >
                            Edit
                          </button>
                          <span>/</span>
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => {
                              dispatch(deleteSingleDataFromState(item.id));
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
