import tw, { styled } from 'twin.macro';

export const ConnectionWrapperComponent = styled.div`
  ${tw`flex flex-col flex-grow relative lg:min-w-48-5 xl:min-w-32-5 xxl:min-w-24-5`}
  flex-basis: 0;
  min-width: 95%;
  max-width: 100%;
  content-visibility: auto;
`;
