import reducer from '../../helpers/reducer/reducer';
import TourActions from './tour.actions';

export default reducer<{ open: boolean }>({
  [TourActions.Open]: () => (
    { open: true }
  ),
  [TourActions.Close]: () => (
    { open: false }
  ),
});
