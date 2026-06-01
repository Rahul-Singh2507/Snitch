import axios from "axios"

const authApiInstance = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});


export async function createProduct(formData) {
  const response = await authApiInstance.post("/", formData) 
  
    return response.data;
} 
export async function getSellerProducts() {
  const response = await authApiInstance.get("/seller") 
    return response.data;
}