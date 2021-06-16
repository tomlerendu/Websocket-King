import Model from '../../services/orm/model';

export default interface UserInterfaceProperty<T> extends Model {
  value: T,
}

export interface UserInterfaceProperties {
  SelectedWindowId: UserInterfaceProperty<string | null>,
  SelectedProjectId: UserInterfaceProperty<string | null>,
  SidebarOpen: UserInterfaceProperty<boolean>,
}
