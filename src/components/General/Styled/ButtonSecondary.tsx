import tw, { styled } from 'twin.macro';

export interface ButtonSecondaryProps {
  disabled?: boolean,
}

const ButtonSecondary = styled.button(({
  disabled,
}: ButtonSecondaryProps) => [
  tw`text-blue-800 dark:text-blue-200 hover:bg-gray-300 hover:dark:bg-gray-800`,
  disabled && tw`opacity-50 pointer-events-none`,
]);

export default ButtonSecondary;
