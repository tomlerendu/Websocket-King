import tw, { styled } from 'twin.macro';

export interface ButtonPrimaryProps {
  disabled?: boolean,
}

const ButtonPrimary = styled.button(({
  disabled,
}: ButtonPrimaryProps) => [
  tw`bg-purple-700 dark:bg-purple-800 hover:bg-purple-600 hover:dark:bg-purple-700 text-white font-semibold dark:border-2 dark:border-purple-700`,
  disabled && tw`opacity-50 pointer-events-none`,
]);

export default ButtonPrimary;
