import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import persistence from './persistence/persistence-middleware';
import persistenceEnhancer from './persistence/persistence-enhancer';
import env from '../helpers/env';

const enhancers = [
  applyMiddleware(thunk, persistence),
  persistenceEnhancer,
];

if (env('ENABLE_REDUX_DEV_TOOLS')) {
  /* eslint-disable no-underscore-dangle */
  if (!(window as any).__REDUX_DEVTOOLS_EXTENSION__) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw 'Redux dev tools extension is missing. Enable it or disable ENABLE_REDUX_DEV_TOOLS';
  }

  enhancers.push(
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
      && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  );
  /* eslint-enable */
}

const store: any = createStore(
  reducer,
  { },
  compose(...enhancers),
);

export default store;
