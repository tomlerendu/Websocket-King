import State from '../state';

export const internalPropertiesAppIsReady = (state: State): boolean => (
  state.internalProperties
    && state.internalProperties.InitializedRunCount?.value
    && state.internalProperties.InitializedWindowId?.value
);
