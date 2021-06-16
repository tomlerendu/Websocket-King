export default class Deferred<T = undefined> {
  public promise: Promise<T>;

  public resolve?: (value?: T) => void;

  public reject?: () => void;

  public constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve as (value?: T) => void;
    });
  }
}
