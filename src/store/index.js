import { createStore } from "redux";

const initialState = {
  user: {},
  myTests: null,
  style: {
    bgColor: "#24292e",
    minH: "72px"
  },
  publicTests: [],
  statistics: {}
};

function reducer(state = initialState, action) {
  let endState = { ...state };
  switch (action.type) {
    case "ADD_USER": {
      endState.user = action.payload;
      break;
    }
    case "ADD_STYLE_COLOR": {
      endState.style.bgColor = action.payload;
      break;
    }
    case "UPDATA_TEST": {
      endState.user.tests = action.payload;
      endState.myTests = action.payload;
      break;
    }
    case "UPDATA_PUBLIC_TEST": {
      endState.publicTests = action.payload;
      break;
    }
    case "UPDATA_STATICTICS": {
      endState.statistics = action.payload;
      break;
    }
    default: {
      break;
    }
  }

  console.log("changes Store:", endState);
  return endState;
}

const store = createStore(reducer);

export function dispatch(type, payload) {
  store.dispatch({ type, payload });
  console.log("dispatch:\ntype:", type, "\npayload:", payload);
}

export default store;
