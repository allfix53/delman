import axios from 'axios'
import { CgPlayListCheck } from 'react-icons/cg'

const getAllUsers = async () => {
  try {
    const users = await axios.get('https://delman-fe-api.fly.dev/users')
    return users.data?.data
  } catch (e) {
    throw new Error(e)
  }
}

const createUsers = async (data) => {
  try {
    const users = await axios.post('https://delman-fe-api.fly.dev/users', data)
    return users.data
  } catch (error) {
    return error
  }
}

const deleteUser = async (idUser) => {
  try {
    const users = await axios.delete(
      `https://delman-fe-api.fly.dev/users/${idUser}`
    )
    return users.data
  } catch (e) {
    throw new Error(e)
  }
}

export { getAllUsers, createUsers, deleteUser }
