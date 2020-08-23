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
  const createSkillCategory = (category: ICategory) => {
    setShouldUpdate(true);
    return skillCategoryService.create(category);
  };

  const getSkillCategoryById = (id: number) => {
    return skillCategoryService.getById(id);
  };

  const updateSkillCategory = (category: ICategory) => {
    setShouldUpdate(true);
    return skillCategoryService.update(category);
  };

  const deleteSkillCategory = (id: number) => {
    setShouldUpdate(true);
    return skillCategoryService.delete(id);
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
