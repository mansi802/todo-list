export const addWork = (value) => (dispatch, getState) => {
  // console.log(getState());
  dispatch({
    type: "ADD_WORK",
    payload: {
      id: "_" + Math.random().toString(36).substr(2, 9),
      work: value,
      completed: false,
    },
  });

  localStorage.setItem("all", JSON.stringify(getState().all));
  localStorage.setItem("active", JSON.stringify(getState().active));
  localStorage.setItem("completed", JSON.stringify(getState().completed));
};

export const workComplete = (id) => (dispatch, getState) => {
  dispatch({
    type: "WORK_COMPLETE",
    payload: id,
  });

  localStorage.setItem("all", JSON.stringify(getState().all));
  localStorage.setItem("active", JSON.stringify(getState().active));
  localStorage.setItem("completed", JSON.stringify(getState().completed));
};

export const clearCompleted = () => (dispatch, getState) => {
  dispatch({
    type: "CLEAR_COMPLETED",
  });

  localStorage.setItem("all", JSON.stringify(getState().all));
  localStorage.setItem("active", JSON.stringify(getState().active));
  localStorage.setItem("completed", JSON.stringify(getState().completed));
};

export const removeWork = (id) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_WORK",
    payload: id,
  });

  localStorage.setItem("all", JSON.stringify(getState().all));
  localStorage.setItem("active", JSON.stringify(getState().active));
  localStorage.setItem("completed", JSON.stringify(getState().completed));
};
