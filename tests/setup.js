import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { publicRuntimeConfig, serverRuntimeConfig } from '../next.config';
import { setConfig } from 'next/config';

global.fetch = require('jest-fetch-mock');

setConfig({ publicRuntimeConfig, serverRuntimeConfig });
configure({ adapter: new Adapter() });
