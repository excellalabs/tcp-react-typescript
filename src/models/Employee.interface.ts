import { BaseItem, IBaseItem } from './BaseItem.interface'

import { IEmployeeSkill } from './Skill.interface'
import { IUSAddress } from './Address.interface'

export enum GENDER {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}

export enum ETHNICITY {
  CAUCASIAN = 'Caucasian', // or Eurpoean
  HISPANIC = 'Hispanic', // or Latino
  AMERICAN_INDIAN = 'American Indian', // or Native Alaskan
  ASIAN = 'Asian', // or Pacific Islander
  BLACK = 'Black', // or African American
  DECLINED = 'Declined', // Prefer not to say
  OTHER = 'Other', // Requires specifying in text box?
}

export class Employee extends BaseItem {
  // Bio
  public firstName: string
  public middleInitial: string | undefined
  public lastName: string
  public birthDate: Date
  public gender: GENDER
  public ethnicity: ETHNICITY
  public usCitizen: boolean
  // Contact
  public email: string
  public phoneNumber: string
  public address: IUSAddress
  // Skills
  public skills: IEmployeeSkill[]

  constructor(employee: IEmployee) {
    super(employee.id)

    this.firstName = employee.bio.firstName
    this.middleInitial = employee.bio.middleInitial
    this.lastName = employee.bio.lastName
    this.birthDate = employee.bio.birthDate
    this.gender = employee.bio.gender
    this.ethnicity = employee.bio.ethnicity
    this.usCitizen = employee.bio.usCitizen

    this.email = employee.contact.email
    this.phoneNumber = employee.contact.phoneNumber
    this.address = employee.contact.address

    this.skills = employee.skills
  }

  get fullName(): string {
    return `${this.firstName}${this.middleInitial ? ' ' : ''}${
      this.middleInitial ?? ''
    } ${this.lastName}`
  }

  toJSON(): IEmployee {
    return {
      id: this.id,
      bio: {
        firstName: this.firstName,
        middleInitial: this.middleInitial,
        lastName: this.lastName,
        birthDate: this.birthDate,
        gender: this.gender,
        ethnicity: this.ethnicity,
        usCitizen: this.usCitizen,
      },
      contact: {
        email: this.email,
        phoneNumber: this.phoneNumber,
        address: this.address,
      },
      skills: this.skills,
    }
  }
}

export interface IEmployee extends IBaseItem {
  bio: IEmployeeBio
  contact: IEmployeeContact
  skills: IEmployeeSkill[]
}

export interface IEmployeeBio {
  firstName: string
  middleInitial?: string // optional
  lastName: string
  birthDate: Date // date mask, should be over 18?
  gender: GENDER // radio buttons
  ethnicity: ETHNICITY // drop-down
  usCitizen: boolean // check-box
}

export interface IEmployeeContact {
  email: string // with validation
  phoneNumber: string // input mask
  address: IUSAddress // with validation
}
