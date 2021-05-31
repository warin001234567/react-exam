const loadState = () => {
  try {
    console.log("innn");
    const serializedState = localStorage.getItem("storeUserData");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return [];
  }
};

const saveState = (state) => {
  console.log("saveState");
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("storeUserData", serializedState);
  } catch (error) {
    console.log(error.message);
  }
};

export { loadState, saveState };
