import ButtonAction from './ButtonAction';

export default interface Notification {
  id: string,
  title: string,
  body: string,
  actions: ButtonAction[],
}
