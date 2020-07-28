export type EmployeeFormModelInterface = {
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
};

export const EmployeeFormModel: EmployeeFormModelInterface = {
  formField: {
    firstName: {
      name: "firstName",
      label: "First name*",
      requiredErrorMsg: "First name is required",
    },
    middleInitial: {
      name: "middleInitial",
      label: "Middle Initial",
    },
    lastName: {
      name: "lastName",
      label: "Last name*",
      requiredErrorMsg: "Last name is required",
    },
    dob: {
      name: "dob",
      label: "Date of Birth*",
      requiredErrorMsg: "Date of Birth is required",
    },
    gender: {
      name: "gender",
    },
    ethnicity: {
      name: "ethnicity",
      label: "Ethnicity*",
      requiredErrorMsg: "Ethnicity is required",
    },
    isCitizen: {
      name: "isCitizen",
      label: "US Citizen",
    },
  },
};
