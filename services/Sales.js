import axios from 'axios'

const getAllSales = async () => {
  try {
    const sales = await axios.get('https://delman-fe-api.fly.dev/')
    return sales.data?.data
  } catch (e) {
    throw new Error(e)
  }
}

export { getAllSales }
