import Action from './action';

export default function reducer<T>(
  methods: {
    [key: number]: (state: T, action: Action) => T;
  },
): (state: T, action: Action) => T {
  return (state, action) => {
    if (methods[action.type] !== undefined) {
      return methods[action.type]!(state, action);
    }

    return state;
  };
}
