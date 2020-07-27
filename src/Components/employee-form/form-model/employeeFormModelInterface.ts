interface EmployeeFormModelInterface {
  formField: {
    firstName: {
      name: string;
      label: string;
      requiredErrorMsg: string;
    };
    middleInitial: {
      name: string;
      label: string;
    };
    lastName: {
      name: string;
      label: string;
      requiredErrorMsg: string;
    };
    dob: {
      name: string;
      label: string;
      requiredErrorMsg: string;
    };
    gender: {
      name: string;
    };
    ethnicity: {
      name: string;
      label: string;
      requiredErrorMsg: string;
    };
    isCitizen: {
      name: string;
      label: string;
    };
  };
}

export default EmployeeFormModelInterface;
