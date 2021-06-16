import { createGlobalStyle } from 'styled-components';
import tw, { theme } from 'twin.macro';

export interface GlobalStylesProps {
  backgroundColor?: string,
}

const GlobalStyles = createGlobalStyle<GlobalStylesProps>`
  body {
    ${tw`text-base select-none bg-gray-50 dark:bg-gray-950`}
  }
  
  #root {
    ${tw`h-screen text-sm`}
  }
  
  input:focus,
  select:focus,
  textarea:focus,
  button:focus,
  div[contenteditable]:focus {
    ${tw`outline-none!`}
  }

  .editor {
    @media (prefers-color-scheme: light) {
      .token {
        &.punctuation {
          color: ${theme`colors.gray.900`};
        }
        &.property {
          color: ${theme`colors.teal.700`};
        }
        &.operator {
          color: ${theme`colors.gray.700`};
        }
        &.string {
          color: ${theme`colors.blue.900`};
        }
      }
    }
    @media (prefers-color-scheme: dark) {
      .token {
        &.punctuation {
          color: ${theme`colors.gray.100`};
        }
        &.property {
          color: ${theme`colors.teal.300`};
        }
        &.operator {
          color: ${theme`colors.gray.300`};
        }
        &.string {
          color: ${theme`colors.blue.300`};
        }
      }
    }
  }
`;

export default GlobalStyles;
