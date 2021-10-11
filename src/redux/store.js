import { applyMiddleware, createStore } from "redux";
import reducer from "./reducers/todoReducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const allFromStorage = localStorage.getItem("all")
  ? JSON.parse(localStorage.getItem("all"))
  : [];
const activeFromStorage = localStorage.getItem("active")
  ? JSON.parse(localStorage.getItem("active"))
  : [];
const completedFromStorage = localStorage.getItem("completed")
  ? JSON.parse(localStorage.getItem("completed"))
  : [];

const middleware = [thunk];

const initialState = {
  all: allFromStorage,
  active: activeFromStorage,
  completed: completedFromStorage,
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
