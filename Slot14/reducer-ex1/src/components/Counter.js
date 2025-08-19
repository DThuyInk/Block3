import React, { useReducer } from "react";

// Định nghĩa hàm reducer để xử lý các hành động
function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}
function Counter() {
  // Sử dụng useReducer để quản lý trạng thái count
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div align="center">
      <h1>Counter: {state.count}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
}

export default Counter;
