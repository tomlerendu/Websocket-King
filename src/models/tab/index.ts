import Model from '../../services/orm/model';

export default interface Tab extends Model {
  number: number,
  connectionId: string,
  content: string,
  selected: boolean,
  savedPayloadId?: string,
}
