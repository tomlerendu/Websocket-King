import Model from '../../services/orm/model';

export default interface SavedPayload extends Model {
  projectId: string,
  name: string,
  content: string,
}
