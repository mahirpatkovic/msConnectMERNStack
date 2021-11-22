import axios from 'axios';
import ENV from '../util/env-config';

class Service {
    static signup(reqData) {
        return axios.post(ENV.apiBase + '/users/signup', reqData);
    }

    static login(reqData) {
        return axios.post(ENV.apiBase + '/users/login', reqData);
    }

    static getAllUser() {
        return axios.get(ENV.apiBase + '/users');
    }
}

export default Service;
