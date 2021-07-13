const production = 'http://bernoullibackend.herokuapp.com'
const development = 'http://localhost:8000'

const baseURL = (
    process.env.NODE_ENV ?
        development
        :
        production
);

export default baseURL

