import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15.4'

// React 15 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() })

// Make Enzyme functions available in all test files without importing
global.shallow = shallow
