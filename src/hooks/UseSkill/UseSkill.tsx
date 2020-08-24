import { ISkill, Skill } from "../../models/Skill.interface";
import { useCallback, useEffect, useState } from "react";

import SkillService from "../../services/Skill/SkillService";
import { useAuthState } from "../../context/AuthContext/AuthContext";

const useSkill = () => {
  const { status, token } = useAuthState();

  // Cache service, refreshing on token change
  const [skillService, setSkillService] = useState<SkillService>(
    new SkillService(token)
  );

  // Variable to re-render the screen
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    setSkillService(new SkillService(token));
  }, [token]);

  // Wrapper functions for CRUD operations
  const createSkill = async (skill: ISkill) => {
    const res = await skillService.create(skill);
    setShouldUpdate(true);
    return res;
  };

  const getSkillById = (id: number) => {
    return skillService.getById(id);
  };

  const updateSkill = async (skill: ISkill) => {
    const res = await skillService.update(skill);
    setShouldUpdate(true);
    return res;
  };

  const deleteSkill = async (id: number) => {
    const res = await skillService.delete(id);
    setShouldUpdate(true);
    return res;
  };

  // Cache for skills
  const [skills, setSkills] = useState([] as ISkill[]);

  const fetchSkills = useCallback(async () => {
    skillService
      .get()
      .then((res) => {
        res.status === 200
          ? setSkills(
              res.data.map((item) => {
                return new Skill(item);
              })
            )
          : setSkills([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [skillService, shouldUpdate]);

  // Re-render upon updates
  useEffect(() => {
    if (shouldUpdate) {
      setShouldUpdate(false);
      fetchSkills();
    }
  }, [fetchSkills, shouldUpdate]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchSkills();
    }
  }, [fetchSkills, status]);

  return {
    skills,
    fetchSkills,
    createSkill,
    getSkillById,
    updateSkill,
    deleteSkill,
  };
};

export default useSkill;
