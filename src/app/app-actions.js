import axios from 'axios';
import { APP_INIT, HIDE_ALERT, APP_INIT_COMPLETED } from './app-constants';

export function appInit() {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    return {
        type: APP_INIT,
    }
}

export function dismissAlert() {
    return {
        type: HIDE_ALERT
    }
}

export function appInitCompleted() {
    return {
        type: APP_INIT_COMPLETED,
    }
}