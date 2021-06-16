import { GlobalStyles as TwinGlobalStyles } from 'twin.macro';
import GlobalStyles from '../src/components/General/Styled/GlobalStyles';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <>
      <TwinGlobalStyles />
      <GlobalStyles backgroundColor="white" />
      <Story />
    </>
  ),
];