import React, { useState } from "react";

import { AxiosResponse } from "axios";
import { ISkill } from "../../models/Skill.interface";
import SkillForm from "./SkillForm/SkillForm";
import SkillTable from "./SkillTable/SkillTable";
import useSkill from "../../hooks/UseSkill/UseSkill";

const SkillsPage: React.FC<{}> = () => {
  // Skills API
  const {
    skills,
    fetchSkills,
    createSkill,
    getSkillById,
    updateSkill,
    deleteSkill,
  } = useSkill();

  // State for the skill being worked on
  const [skillToEdit, setSkillToEdit] = useState<ISkill | undefined>(
    {} as ISkill
  );

  // Response Handlers
  function refreshAfter(call: Promise<AxiosResponse<ISkill>>) {
    call
      .then(() => {
        // Update the list automatically, so user doesn't need to reload
        fetchSkills();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  const handleSubmit = (skill: ISkill) => {
    if (skill.id) {
      refreshAfter(updateSkill(skill));
    } else {
      refreshAfter(createSkill(skill));
    }
  };

  function handleEditSkill(id: number) {
    getSkillById(id).then((response) => {
      setSkillToEdit(response.data);
    });
  }

  function handleDeleteSkill(id: number) {
    refreshAfter(deleteSkill(id));
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
