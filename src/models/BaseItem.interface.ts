export interface IBaseItem {
  id: number
}

export class BaseItem implements IBaseItem {
  readonly id: number

  constructor(id: number) {
    this.id = id
  }
}
