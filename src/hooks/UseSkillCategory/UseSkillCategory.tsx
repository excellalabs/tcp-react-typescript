import { useState, useCallback, useEffect } from "react";
import { useAuthState } from "../../context/AuthContext/AuthContext";
import SkillCategoryService from "../../services/SkillCategory/SkillCategoryService";
import {
  ISkillCategory,
  SkillCategory,
} from "../../models/SkillCategory.interface";

const useSkillCategory = () => {
  const { status, token } = useAuthState();

  const [categories, setCategories] = useState([] as ISkillCategory[]);

  const fetchSkillCategories = useCallback(async () => {
    const categoryService = new SkillCategoryService(token);
    categoryService
      .get()
      .then((res) => {
        res.status === 200
          ? setCategories(
              res.data.map((item) => {
                return new SkillCategory(item);
              })
            )
          : setCategories([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchSkillCategories();
    }
  }, [fetchSkillCategories, status]);

  return { categories };
};

export default useSkillCategory;
