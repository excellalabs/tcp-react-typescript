import React, { useState } from 'react'

import CategoryForm from './CategoryForm/CategoryForm'
import CategoryTable from './CategoryTable/CategoryTable'
import { ICategory } from '../../models/Skill.interface'
import useSkill from '../../hooks/UseSkill/UseSkill'
import useSkillCategory from '../../hooks/UseSkillCategory/UseSkillCategory'

const Categories: React.FC<{}> = () => {
  //Fetch categories from API
  const {
    skillCategories,
    createSkillCategory,
    getSkillCategoryById,
    updateSkillCategory,
    deleteSkillCategory,
  } = useSkillCategory()

  // Count skills per category
  const { skills } = useSkill()
  const skilledCategories = skillCategories.map((c) => ({
    ...c,
    skillCount: skills.filter((s) => s.category.id === c.id).length,
  }))

  const [categoryToEdit, setCategoryToEdit] = useState<ICategory | undefined>(
    {} as ICategory
  )

  // Response handlers
  const handleSubmit = (category: ICategory) => {
    if (category.id) {
      updateSkillCategory(category)
    } else {
      createSkillCategory(category)
    }
  }

  function handleEditCategory(id: number) {
    getSkillCategoryById(id).then((response) => {
      setCategoryToEdit(response.data)
    })
  }

  function handleDeleteCategory(id: number) {
    deleteSkillCategory(id)
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
  )
}

export default Categories
