import axios from 'axios';
import { APP_INIT } from './app-constants';

export function appInit() {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    return {
        type: APP_INIT,
    }
}
