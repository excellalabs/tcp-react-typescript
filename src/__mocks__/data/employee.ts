import { ETHNICITY, GENDER } from "../../models/Employee.interface";
import { PROFICIENCY } from "../../models/Skill.interface";

export default {
  bio: {
    firstName: "",
    lastName: "",
    middleInitial: "",
    birthDate: new Date(),
    gender: GENDER.MALE,
    ethnicity: ETHNICITY.AMERICAN_INDIAN,
    usCitizen: true,
  },
  contact: {
    email: "a",
    phoneNumber: "",
    address: {
      line1: "",
      line2: "",
      zipCode: "",
      city: "",
      stateCode: "",
    },
  },
  skills: [
    {
      id: 2,
      skill: { id: 2, name: "", category: { name: "", id: 1 } },
      proficiency: PROFICIENCY.LOW,
      primary: true,
    },
  ],
  id: 1,
};
