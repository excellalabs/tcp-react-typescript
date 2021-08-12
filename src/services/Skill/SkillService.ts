import { ISkill } from '../../models/Skill.interface'
import { IBaseCrudService, BaseCrudService } from '../abstract/BaseCrudService'

export interface ISkillService extends IBaseCrudService<ISkill> {}

export default class SkillService
  extends BaseCrudService<ISkill>
  implements ISkillService
{
  endpoint = '/skill'
}
