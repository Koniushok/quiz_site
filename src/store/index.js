import { createStore } from "redux";

const initialState = {
  user: {},
  style: {
    bgColor: "#24292e",
    minH: "72px"
  }
};

function reducer(state = initialState, action) {
  let endState = { ...state };
  switch (action.type) {
    case "ADD_USER": {
      endState.user = action.payload;
      return endState;
    }
    case "ADD_STYLE-COLOR": {
      endState.style.bgColor = action.payload;
      return endState;
    }
  }
  return endState;
}

const store = createStore(reducer);

export default store;
