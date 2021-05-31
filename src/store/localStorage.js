const loadState = () => {
  try {
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
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("storeUserData", serializedState);
  } catch (error) {}
};

export { loadState, saveState };
