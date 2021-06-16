import Model from '../../services/orm/model';

export default interface Window extends Model {
  projectId: string,
  openedAt: string | null,
  closedAt: string | null,
}
