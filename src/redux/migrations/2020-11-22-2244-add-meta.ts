export default {
  id: '2020-11-22-2244-add-meta',
  migrator: (state: any) => ({
    ...state,
    internalProperties: {
      InitializedRunCount: {
        id: 'InitializedRunCount',
        value: false,
      },
      InitializedWindowId: {
        id: 'InitializedWindowId',
        value: false,
      },
      FirstUseAt: {
        id: 'FirstUseAt',
        value: new Date().toISOString(),
      },
      RunCount: {
        id: 'RunCount',
        value: 0,
      },
      HasShownChromeRatingPrompt: {
        id: 'HasShownChromeRatingPrompt',
        value: false,
      },
      HasShownTourPrompt: {
        id: 'HasShownTourPrompt',
        value: false,
      },
    },
  }),
};
