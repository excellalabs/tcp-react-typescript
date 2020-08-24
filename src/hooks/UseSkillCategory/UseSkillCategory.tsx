import { Category, ICategory } from "../../models/Skill.interface";
import { useCallback, useEffect, useMemo, useState } from "react";

import SkillCategoryService from "../../services/SkillCategory/SkillCategoryService";
import { useAuthState } from "../../context/AuthContext/AuthContext";

const useSkillCategory = () => {
  const { status, token } = useAuthState();

  const [skillCategoryService, setSkillCategoryService] = useState<
    SkillCategoryService
  >(new SkillCategoryService(token));

  // Variable to re-render the screen
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    setSkillCategoryService(new SkillCategoryService(token));
  }, [token]);

  // Wrapper functions for CRUD operations
  const createSkillCategory = async (category: ICategory) => {
    const res = await skillCategoryService.create(category);
    setShouldUpdate(true);
    return res;
  };

  const getSkillCategoryById = (id: number) => {
    return skillCategoryService.getById(id);
  };

  const updateSkillCategory = async (category: ICategory) => {
    const res = await skillCategoryService.update(category);
    setShouldUpdate(true);
    return res;
  };

  const deleteSkillCategory = async (id: number) => {
    const res = await skillCategoryService.delete(id);
    setShouldUpdate(true);
    return res;
  };

  const [skillCategories, setSkillCategories] = useState([] as ICategory[]);

  // Fetch categories
  const fetchSkillCategories = useCallback(async () => {
    skillCategoryService
      .get()
      .then((res) => {
        res.status === 200
          ? setSkillCategories(
              res.data.map((item) => {
                return new Category(item);
              })
            )
          : setSkillCategories([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [skillCategoryService, shouldUpdate]);

  // Re-render upon updates
  useEffect(() => {
    if (shouldUpdate) {
      setShouldUpdate(false);
      fetchSkillCategories();
    }
  }, [fetchSkillCategories, shouldUpdate]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchSkillCategories();
    }
  }, [fetchSkillCategories, status]);

  return {
    skillCategories,
    fetchSkillCategories,
    createSkillCategory,
    getSkillCategoryById,
    updateSkillCategory,
    deleteSkillCategory,
  };
};

export default useSkillCategory;
