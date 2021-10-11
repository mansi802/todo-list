const reducer = (state = { all: [], active: [], completed: [] }, action) => {
  // console.log(state.all);

  switch (action.type) {
    case "ADD_WORK":
      return {
        ...state,
        all: [...state.all, action.payload],
        active: [...state.active, action.payload],
      };

    case "WORK_COMPLETE":
      let work = state.all.map((x) => {
        if (x.id === action.payload) {
          x.completed = !x.completed;
        }
        return x;
      });

      return {
        ...state,
        all: work,
        active: state.all.filter((x) => x.completed === false),
        completed: state.all.filter((x) => x.completed === true),
      };

    case "CLEAR_COMPLETED": {
      return {
        ...state,
        all: state.all.filter((x) => x.completed === false),
        completed: [],
      };
    }

    case "REMOVE_WORK":
      return {
        ...state,
        all: state.all.filter((x) => x.id !== action.payload),
        active: state.active.filter((x) => x.id !== action.payload),
        completed: state.completed.filter((x) => x.id !== action.payload),
      };

    default:
      return state;
  }
};

export default reducer;
