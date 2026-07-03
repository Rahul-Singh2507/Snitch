import Razorpay from "razorpay"
import { config } from "../config/config.js"

const razorpay = new Razorpay({
    key_id: config.RAZORPAY_KEY_ID,
    key_secret: config.RAZORPAY_KEY_SECRET
})


export const createOrder = async ({ amount, currency = "INR" }) => {

     console.log("KEY:", config.RAZORPAY_KEY_ID)
    console.log("SECRET:", config.RAZORPAY_KEY_SECRET)
    const options = {
        amount: amount * 100, // amount in the smallest currency unit
        currency,
    }

    const order = await razorpay.orders.create(options)

    return order
}