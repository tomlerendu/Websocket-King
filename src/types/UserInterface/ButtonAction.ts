export default interface ButtonAction {
  label: string,
  onClick?: () => void,
  theme?: 'primary' | 'secondary',
  type?: 'button' | 'submit',
}
