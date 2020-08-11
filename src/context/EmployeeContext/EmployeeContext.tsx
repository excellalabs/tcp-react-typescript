import React, {
  createContext,
  useReducer,
  useContext,
  useCallback,
} from "react";
import { IEmployee } from "../../models/Employee.interface";
import EmployeeService from "../../services/Employee/EmployeeService";
import { useAuthState } from "../AuthContext/AuthContext";

type EmployeeState = {
  loading: boolean;
  employees: Array<IEmployee> | undefined;
};
type EmployeeAction = {
  type: "getEmployees" | "getEmployeeSuccess";
  payload?: Array<IEmployee>;
};
type EmployeeDispatch = (action: EmployeeAction) => void;

const EmployeeStateContext = createContext<EmployeeState | undefined>(
  undefined
);
const EmployeeDispatchContext = createContext<EmployeeDispatch | undefined>(
  undefined
);

function employeeReducer(state: EmployeeState, action: EmployeeAction) {
  switch (action.type) {
    case "getEmployees": {
      console.log("getting employees");
      return {
        ...state,
        loading: true,
      };
    }
    case "getEmployeeSuccess": {
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        employees: action.payload,
      };
    }
  }
}

const defaultState: EmployeeState = {
  loading: false,
  employees: undefined,
};

const EmployeeProvider: React.FC<{}> = ({ children }) => {
  const { token } = useAuthState();

  const [state, dispatch]: [
    EmployeeState,
    EmployeeDispatch
  ] = useReducer(employeeReducer, { ...defaultState });

  const fetchEmployees = useCallback(async () => {
    const employeeService = new EmployeeService(token);
    employeeService
      .get()
      .then((res) => {
        console.log(res);
        res.status === 200
          ? dispatch({ type: "getEmployeeSuccess", payload: res.data })
          : console.log("error");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  React.useEffect(() => {
    if (state.loading === true) {
      console.log("loading is true");
      fetchEmployees();
    }
  }, [state.loading, fetchEmployees]);

  return (
    <EmployeeStateContext.Provider value={state}>
      <EmployeeDispatchContext.Provider value={dispatch}>
        {children}
      </EmployeeDispatchContext.Provider>
    </EmployeeStateContext.Provider>
  );
};

function useEmployeeState(): EmployeeState {
  const context = useContext(EmployeeStateContext);
  if (context === undefined) {
    throw new Error("useEmployeeState must be used within an EmployeeProvider");
  }

  return context;
}

function useEmployeeDispatch(): EmployeeDispatch {
  const context = useContext(EmployeeDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useEmployeeDispatch must be used within an EmployeeProvider"
    );
  }

  return context;
}

export { EmployeeProvider, useEmployeeState, useEmployeeDispatch };
