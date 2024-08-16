import axios from 'axios'
import url from 'url'

const baseURL = `${process.env.BASE_URL}/api/`
const baseURL2 = `https://sinaker.onrender.com/`
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
