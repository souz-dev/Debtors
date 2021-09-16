import axios from 'axios'
// import usersService from './users'
import debtorsService from './debtors'
const API_ENVS = {
  users: 'https://jsonplaceholder.typicode.com',
  debtors: 'https://provadev.xlab.digital/api/v1',
}

const httpUsers = axios.create({
  baseURL: API_ENVS.users
})

const httpDebtors = axios.create({
  baseURL: API_ENVS.debtors
})

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  users: httpUsers,
  debtors: debtorsService(httpDebtors)
}