import axios from 'axios'
import url from 'url'

const baseURL = `${process.env.BASE_URL}/api/`
const baseURL2 = `http://localhost:3000`
const apiEndPoint = `/api`
const fullUrl = url.resolve(baseURL2, apiEndPoint)

export default axios.create({
  baseURL: fullUrl
})

export const axiosAuth = token =>
  axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
