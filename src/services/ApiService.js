import axios from "axios";

const ApiService = {

    getProducts(pagination){
        return axios.get(`https://dummyjson.com/products/search?q=${pagination.title}&skip=${pagination.page}&limit=${pagination.limit}`)
    },
    getProductById(id){
        return axios.get(`https://dummyjson.com/products/${id}`)
    },
    getCategories() {
        return axios.get(`https://dummyjson.com/products/categories`)
    },
    getByCategory(category) {
        return axios.get(`https://dummyjson.com/products/category/${category}`)
    }


}
export default ApiService
