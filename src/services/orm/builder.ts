import State from '../../redux/state';
import Model from './model';

export default class Builder<T extends Model> {
  private models: T[] = [];

  private filters: ((model: T) => boolean)[] = [];

  private sort?: (modelA: T, modelB: T) => number;

  private skipAmount: number = 0;

  private limitAmount: number | null = null;

  constructor(
    protected table: keyof State,
  ) { }

  public withState(state: State) {
    this.models = Object.values(state[this.table]);
    return this;
  }

  public where(property: keyof T, value: any) {
    this.filters.push((model) => model[property] === value);
    return this;
  }

  public whereLessThan(property: keyof T, value: any) {
    this.filters.push((model) => model[property] < value);
    return this;
  }

  public whereGreaterThan(property: keyof T, value: any) {
    this.filters.push((model) => model[property] > value);
    return this;
  }

  public whereLessThanOrEqualTo(property: keyof T, value: any) {
    this.filters.push((model) => model[property] <= value);
    return this;
  }

  public whereGreaterThanOrEqualTo(property: keyof T, value: any) {
    this.filters.push((model) => model[property] >= value);
    return this;
  }

  public whereIn(property: keyof T, value: any[]) {
    this.filters.push((model) => value.includes(model[property]));
    return this;
  }

  public whereNot(property: keyof T, value: any) {
    this.filters.push((model) => model[property] !== value);
    return this;
  }

  public whereNotIn(property: keyof T, value: any[]) {
    this.filters.push((model) => !value.includes(model[property]));
    return this;
  }

  public whereTrue(property: keyof T) {
    return this.where(property, true);
  }

  public whereFalse(property: keyof T) {
    return this.where(property, false);
  }

  public whereNull(property: keyof T) {
    return this.where(property, null);
  }

  public whereNotNull(property: keyof T) {
    return this.whereNot(property, null);
  }

  public whereRaw(filter: (model: T) => boolean) {
    this.filters.push(filter);
    return this;
  }

  public whereModel(model: T) {
    this.where('id', model.id);
    return this;
  }

  public sortAsc(property: keyof T) {
    this.sort = (modelA, modelB) => (modelA[property] > modelB[property] ? 1 : -1);
    return this;
  }

  public sortDesc(property: keyof T) {
    this.sort = (modelA, modelB) => (modelA[property] < modelB[property] ? 1 : -1);
    return this;
  }

  public skip(skipAmount: number) {
    this.skipAmount = skipAmount;
    return this;
  }

  public limit(limitAmount: number) {
    this.limitAmount = limitAmount;
    return this;
  }

  public exists(): boolean {
    return this.get().length > 0;
  }

  public first(): T | null {
    this.limit(1);

    return this.get()[0] || null;
  }

  public get(): T[] {
    const models = this.models.filter(this.match.bind(this));

    if (this.sort) {
      models.sort(this.sort.bind(this));
    }

    return models.slice(
      this.skipAmount,
      this.limitAmount === null
        ? undefined
        : this.limitAmount + 1,
    );
  }

  public getPreference(id: string): string {
    this.where('id', id);
    return (this.first() as any).value;
  }

  private match(model: T): boolean {
    return this.filters.reduce<boolean>(
      (accumulator, filter) => accumulator && filter(model),
      true,
    );
  }
}
