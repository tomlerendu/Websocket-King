import Project from '../../models/project';
import Window from '../../models/window';
import createOrmAction from '../../services/orm/create-orm-action';
import { internalPropertiesInitializeWindowId } from './internal-properties';

export const userInterfaceProjectSwitch = createOrmAction((
  { dispatch },
  project: Project | null,
) => {
  dispatch(
    internalPropertiesInitializeWindowId(project || undefined),
  );
});

export const userInterfaceWindowSwitch = createOrmAction((
  { builder, state },
  window: Window | null,
) => {
  builder('userInterfaceProperties')
    .whereModel(state.userInterfaceProperties.SelectedWindowId)
    .update({ value: window?.id || null });
});

export const userInterfaceSidebarToggle = createOrmAction((
  { builder, state },
) => {
  builder('userInterfaceProperties')
    .whereModel(state.userInterfaceProperties.SidebarOpen)
    .update({ value: !state.userInterfaceProperties.SidebarOpen.value });
});
