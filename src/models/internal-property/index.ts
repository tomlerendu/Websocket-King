import Model from '../../services/orm/model';

export default interface InternalProperty<T> extends Model {
  value: T,
}

export interface InternalProperties {
  InitializedRunCount: InternalProperty<boolean>,
  InitializedWindowId: InternalProperty<boolean>,
  FirstUseAt: InternalProperty<string>,
  RunCount: InternalProperty<number>,
  HasShownChromeRatingPrompt: InternalProperty<boolean>,
  HasShownTourPrompt: InternalProperty<boolean>,
}
