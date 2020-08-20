import React, { useState } from "react";

import { ICategory } from "../../models/Skill.interface";
import CategoryForm from "./CategoryForm/CategoryForm";
import CategoryTable from "./CategoryTable/CategoryTable";
import useSkillCategory from "../../hooks/UseSkillCategory/UseSkillCategory";

const Categories: React.FC<{}> = () => {
  //Fetch categories from API
  const {
    skillCategories,
    createSkillCategory,
    getSkillCategoryById,
    updateSkillCategory,
    deleteSkillCategory,
  } = useSkillCategory();

  const skilledCategories = skillCategories.map((c) => ({
    ...c,
    skillCount: Math.round(Math.random() * 10),
  }));

  const [categoryToEdit, setCategoryToEdit] = useState<ICategory | undefined>(
    {} as ICategory
  );

  // Response handlers
  const handleSubmit = (category: ICategory) => {
    if (category.id) {
      updateSkillCategory(category).then(() => {});
    } else {
      createSkillCategory(category).then(() => {});
    }
  };

  function handleEditCategory(id: number) {
    getSkillCategoryById(id).then((response) => {
      setCategoryToEdit(response.data);
    });
  }

  function handleDeleteCategory(id: number) {
    deleteSkillCategory(id).then(() => {});
  }

  return (
    <div>
      <CategoryForm
        categoryToEdit={categoryToEdit}
        submitCategory={handleSubmit}
      ></CategoryForm>
      <CategoryTable
        categories={skilledCategories}
        editCategory={handleEditCategory}
        deleteCategory={handleDeleteCategory}
      ></CategoryTable>
    </div>
  );
};

export default Categories;
