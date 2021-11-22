const ENVIRONMENTS = {
    development: {
        apiBase: 'http://127.0.0.1:8800/api',
    },
    production: {
        apiBase: 'https://msconnectapp.herokuapp.com/api',
    },
};

const ENV = ENVIRONMENTS[process.env.REACT_APP_ENV];

export default ENV;
