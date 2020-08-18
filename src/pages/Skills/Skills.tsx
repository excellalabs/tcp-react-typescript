import React, { useState } from "react";

import SkillForm from "./SkillForm/SkillForm";
import SkillTable from "./SkillTable/SkillTable";
import { ISkill } from "../../models/Skill.interface";
import skills from "../../__mocks__/data/skill";

const SkillsPage: React.FC<{}> = () => {

  const [skillToEdit, setSkillToEdit] = useState<ISkill | undefined>(
    {} as ISkill
  );

  const handleSubmit = (skill: ISkill) => {
    if (skill.id) {
      // REPLACE WITH API CALL
      console.log("Updating Skill: ", skill);
    } else {
      // REPLACE WITH API CALL
      console.log("Adding Skill: ", skill);
    }
  };

  function handleEditSkill(id: number) {
    // REPLACE WITH API CALL TO GET SKILL
    setSkillToEdit(skills.find((s) => s.id === id));
  }

  function handleDeleteSkill(id: number) {
    // REPLACE WITH API CALL
    console.log("deleteing: ", id);
  }

  return (
    <div>
      <SkillForm
        skillToEdit={skillToEdit}
        submitSkill={handleSubmit}
      ></SkillForm>
      <SkillTable
        skills={skills}
        editSkill={handleEditSkill}
        deleteSkill={handleDeleteSkill}
      ></SkillTable>
    </div>
  );
};

export default SkillsPage;