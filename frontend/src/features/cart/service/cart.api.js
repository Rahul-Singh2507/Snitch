import axios from 'axios'


const cartApiInstance = axios.create({
    baseURL: '/api/cart',
    withCredentials: true
})


export const addItem = async ({ productId, variantId }) => {
    const route = variantId ? `/add/${productId}/${variantId}` : `/add/${productId}`
    const response = await cartApiInstance.post(route, {
        quantity: 1
    })

    return response.data
}

export const getCart = async () => {
    const response = await cartApiInstance.get('/')
    return response.data
}

export const incrementCartItemApi = async ({ productId, variantId }) => {
    const route = variantId ? `/quantity/increment/${productId}/${variantId}` : `/quantity/increment/${productId}`
    const response = await cartApiInstance.patch(route)
    return response.data
}

export const createCartOrder = async () => {
    const response = await cartApiInstance.post('/payment/create/order')
    return response.data
}

export const verifyCartOrder = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
    const response = await cartApiInstance.post('/payment/verify/order', {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    })

    return response.data
}