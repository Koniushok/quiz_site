import { createStore } from "redux";

const initialState = {
  user: {},
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
      console.log("New Test:", action.payload);
      endState.user.tests = action.payload;
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
  }

  console.log("changes Store:", endState);
  return endState;
}

const store = createStore(reducer);

export function dispatch(type, payload) {
  store.dispatch({ type, payload });
}

export default store;
