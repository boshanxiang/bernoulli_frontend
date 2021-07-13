const production = 'http://bernoullibackend.herokuapp.com/'
development = 'http://localhost:8000/'

const baseURL = (
    process.env.NODE_ENV ?
        production
        :
        development
);

export default baseURL