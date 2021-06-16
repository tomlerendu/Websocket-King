import State from '../../redux/state';
import Builder from './builder';
import Model from './model';
import MutableBuilder from './mutable-builder';

export function createMutableDataSource<T extends Model>(
  table: keyof State,
): () => MutableBuilder<T> {
  return () => new MutableBuilder<T>(table);
}

export function createDataSource<T extends Model>(
  table: keyof State,
): () => Builder<T> {
  return () => new Builder<T>(table);
}
