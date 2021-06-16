import State from '../state';
import Project from '../../models/project';

export const projectById = (state: State, id: string): Project => (
  state.projects[id]
);

export const allProjects = (state: State): Project[] => (
  Object.values(state.projects)
);

export const isAnyProjectOpen = (state: State): boolean => (
  state.userInterfaceProperties.SelectedProjectId.value !== null
);

export const currentProject = (state: State): Project => (
  projectById(state, state.userInterfaceProperties.SelectedProjectId.value!)
);
