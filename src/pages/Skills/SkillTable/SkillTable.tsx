import { DataColumn, DataTable } from '../../../components/DataTable/DataTable'

import { Button } from '@material-ui/core'
import { ISkill } from '../../../models/Skill.interface'
import React from 'react'

export type SkillTableProps = {
  skills: ISkill[]
  editSkill: (id: number) => void
  deleteSkill: (id: number) => void
}

export interface ISkillWithCategoryName extends ISkill {
  categoryName: string
}

const SkillTable: React.FC<SkillTableProps> = ({
  skills,
  editSkill,
  deleteSkill,
}) => {
  const skillsWithCategoryName = skills.map((s) => ({
    ...s,
    categoryName: s.category.name,
  }))

  const columns: DataColumn<ISkillWithCategoryName>[] = [
    {
      propertyName: 'id',
      headerLabel: '',
      isNumeric: false,
      renderer: (data: ISkillWithCategoryName) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => editSkill(data.id)}
        >
          EDIT
        </Button>
      ),
    },
    {
      // Don't Touch
      propertyName: 'name',
      headerLabel: 'Name',
      isNumeric: false,
      renderer: (data: ISkillWithCategoryName) => data.name,
    },
    {
      propertyName: 'categoryName',
      headerLabel: 'Skill Category',
      isNumeric: false,
      renderer: (data: ISkillWithCategoryName) => data.categoryName,
    },
    {
      propertyName: 'id',
      headerLabel: '',
      isNumeric: false,
      renderer: (data: ISkillWithCategoryName) => (
        <Button color="secondary" onClick={() => deleteSkill(data.id)}>
          DELETE
        </Button>
      ),
    },
  ]

  return (
    <>
      <DataTable<ISkillWithCategoryName>
        columns={columns}
        rows={skillsWithCategoryName}
        initialSortProperty="name"
      />
    </>
  )
}

export default SkillTable
