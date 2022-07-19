import React, { useReducer } from "react";
import AuthContext from "./AuthContext";

const defaultState = {
  isloggedin: false,
  tokenId: "",
  expenses: [],
};

const loginReducer = (state, action) => {
  if (action.type === "LOGIN") {
    return {
      ...state,
      isloggedin: true,
      tokenId: action.tokenId,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      isloggedin: false,
      tokenId: "",
    };
  }

  if (action.type === "ADD_EXPENSE") {
    let updatedExpense = [...state.expenses, action.expenseItem];
    console.log(updatedExpense);
    return {
      ...state,
      expenses: updatedExpense,
    };
  }
};

const AuthProvider = (props) => {
  const [loginState, dispatchLoginAction] = useReducer(
    loginReducer,
    defaultState
  );

  const login = (tokenId) => {
    dispatchLoginAction({ type: "LOGIN", tokenId: tokenId });
    localStorage.setItem("token", tokenId);
  };

  const logout = () => {
    dispatchLoginAction({ type: "LOGOUT" });
    localStorage.removeItem("token");
  };
  const addExpense = (expenseItem) => {
    dispatchLoginAction({ type: "ADD_EXPENSE", expenseItem: expenseItem });
  };

  const authContext = {
    tokenId: loginState.tokenId,
    isloggedin: loginState.isloggedin,
    login: login,
    logout: logout,
    addexpense: addExpense,
    expenses: loginState.expenses,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
