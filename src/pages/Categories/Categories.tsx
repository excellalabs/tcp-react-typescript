import React, { useState } from "react";

import CategoryForm from "./CategoryForm/CategoryForm";
import CategoryTable from "./CategoryTable/CategoryTable";
import { ICategory } from "../../models/Skill.interface";
import categories from "../../__mocks__/data/category";

const Categories: React.FC<{}> = () => {
  // MOCK DATA, SHOULD COME FROM API
  const skilledCategories = categories.map((c) => ({
    ...c,
    skillCount: Math.round(Math.random() * 10),
  }));

  const [categoryToEdit, setCategoryToEdit] = useState<ICategory | undefined>(
    {} as ICategory
  );

  const handleSubmit = (category: ICategory) => {
    if (category.id) {
      // REPLACE WITH API CALL
      console.log("Updating Category: ", category);
    } else {
      // REPLACE WITH API CALL
      console.log("Adding Category: ", category);
    }
  };

  function handleEditCategory(id: number) {
    // REPLACE WITH API CALL TO GET SKILL
    setCategoryToEdit(categories.find((c) => c.id === id));
  }

  function handleDeleteCategory(id: number) {
    // REPLACE WITH API CALL
    console.log("deleteing: ", id);
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
