import Builder from './builder';
import { Mutation, MutationType } from './orm-action';

export default class MutableBuilder<
  T extends { id: string, [key: string]: any },
> extends Builder<T> {
  private mutations: Mutation<T>[] = [];

  public withMutationsList(mutations: Mutation<T>[]) {
    this.mutations = mutations;
    return this;
  }

  public update(fields: Partial<T>) {
    this.mutations.push({
      type: MutationType.Update,
      payload: {
        table: this.table,
        models: this.get(),
        fields,
      },
    });
  }

  public create(models: T[] | T) {
    const wrappedModels = Array.isArray(models)
      ? models
      : [models];

    this.mutations.push({
      type: MutationType.Create,
      payload: {
        table: this.table,
        models: wrappedModels,
      },
    });
  }

  public delete() {
    this.mutations.push({
      type: MutationType.Delete,
      payload: {
        table: this.table,
        models: this.get(),
      },
    });
  }
}
