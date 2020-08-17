import CategoryForm from "./CategoryForm/CategoryForm";
import CategoryTable from "./CategoryTable/CategoryTable";
import { ICategory } from "../../models/Skill.interface";
import React from "react";

const Categories: React.FC<{}> = () => {
  const handleSubmit = (category: ICategory) => {
    console.log("got this from CategoryForm: ", category);
  };

  return (
    <div>
      <CategoryForm submitCategory={handleSubmit}></CategoryForm>
      <CategoryTable></CategoryTable>
    </div>
  );
};

export default Categories;
