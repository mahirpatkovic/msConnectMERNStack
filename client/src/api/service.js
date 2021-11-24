import axios from 'axios';
import ENV from '../util/env-config';
import Cookies from 'js-cookie';

class Service {
    static reqConfig() {
        return {
            headers: {
                authorization: `Bearer ${Cookies.get('token')}`,
            },
        };
    }
    static signup(reqData) {
        return axios.post(
            ENV.apiBase + '/users/signup',
            reqData,
            this.reqConfig()
        );
    }

    static login(reqData) {
        return axios.post(
            ENV.apiBase + '/users/login',
            reqData,
            this.reqConfig()
        );
    }

    static userAuthenticated(reqData) {
        return axios.post(
            ENV.apiBase + '/users/auth',
            reqData,
            this.reqConfig()
        );
    }

    static getAllUser() {
        return axios.get(ENV.apiBase + '/users');
    }
}

export default Service;
