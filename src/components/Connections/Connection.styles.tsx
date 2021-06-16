import tw, { css, styled, theme } from 'twin.macro';

const purpleLight = theme`colors.purple.500`;
const purpleDark = theme`colors.purple.700`;

export const ConnectionComponent = styled.div(
  ({ highlighted }: { highlighted: boolean }) => [
    tw`h-full flex flex-col relative bg-white dark:bg-gray-850 rounded-lg overflow-hidden duration-500 ease-in-out border border-gray-250 dark:border-gray-700 transition-all duration-500`,
    css`
      &:before {
        ${tw`transition-all duration-300 absolute inset-0 pointer-events-none z-30 rounded-lg`}
        content: "";
        box-shadow: inset 0 0 0 ${highlighted ? `2px ${purpleLight}` : '0 transparent'};
        @media (prefers-color-scheme: dark) {
          box-shadow: inset 0 0 0 ${highlighted ? `2px ${purpleDark}` : '0 transparent'};
        }
      }
    `,
  ],
);
