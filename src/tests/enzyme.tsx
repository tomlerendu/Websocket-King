import Enzyme, {
  configure,
  shallow,
  mount,
  render,
} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

export { shallow, mount, render };

export function testId(attributeValue: string) {
  return `[data-testid="${attributeValue}"]`;
}

export default Enzyme;
