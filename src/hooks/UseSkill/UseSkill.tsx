import { useState, useCallback, useEffect } from "react";
import { ISkill, Skill } from "../../models/Skill.interface";
import { useAuthState } from "../../context/AuthContext/AuthContext";
import SkillService from "../../services/Skill/SkillService";

const useSkill = () => {
  const { status, token } = useAuthState();

  const [skills, setSkills] = useState([] as ISkill[]);

  const fetchSkills = useCallback(async () => {
    const skillService = new SkillService(token);
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
  }, [token]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchSkills();
    }
  }, [fetchSkills, status]);

  return { skills };
};

export default useSkill;
