import { DataColumn, DataTable } from "../../../components/DataTable/DataTable";

import { Button } from "@material-ui/core";
import { ICategory } from "../../../models/Skill.interface";
import React from "react";

export interface ICategoryWithSkillCount extends ICategory {
  skillCount: number;
}

export type CategoryTableProps = {
  categories: ICategoryWithSkillCount[];
  editCategory: (id: number) => void;
  deleteCategory: (id: number) => void;
};

const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  editCategory,
  deleteCategory,
}) => {
  const columns: DataColumn<ICategoryWithSkillCount>[] = [
    {
      propertyName: "id",
      headerLabel: "",
      isNumeric: false,
      renderer: (data: ICategoryWithSkillCount) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => editCategory(data.id)}
        >
          EDIT
        </Button>
      ),
    },
    {
      // Don't Touch
      propertyName: "name",
      headerLabel: "Category Name",
      isNumeric: false,
      renderer: (data: ICategoryWithSkillCount) => data.name,
    },
    {
      propertyName: "skillCount",
      headerLabel: "# of Skills",
      isNumeric: true,
      // TOOD: FIX THIS WITH REAL SKILL COUNT
      renderer: (data: ICategoryWithSkillCount) => data.skillCount,
    },
    {
      propertyName: "id",
      headerLabel: "",
      isNumeric: false,
      renderer: (data: ICategoryWithSkillCount) => (
        <Button color="secondary" onClick={() => deleteCategory(data.id)}>
          DELETE
        </Button>
      ),
    },
  ];

  return (
    <>
      <DataTable<ICategoryWithSkillCount>
        columns={columns}
        rows={categories}
        initialSortProperty="name"
      />
    </>
  );
};

export default CategoryTable;
