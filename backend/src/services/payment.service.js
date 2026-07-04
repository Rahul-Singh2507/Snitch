import Razorpay from "razorpay"
import { config } from "../config/config.js"

const razorpay = new Razorpay({
    key_id: config.RAZORPAY_KEY_ID,
    key_secret: config.RAZORPAY_KEY_SECRET
})

export const createOrder = async ({ amount, currency = "INR" }) => {

    console.log("AMOUNT:", amount)
    console.log("CURRENCY:", currency)

    const options = {
        amount: Math.round(amount * 100),
        currency
    }

    console.log("OPTIONS:", options)

    try {

        const order = await razorpay.orders.create(options)

        console.log("RAZORPAY ORDER:", order)

        return order

    } catch (error) {

        console.log("=========== RAZORPAY FULL ERROR ===========")
        console.log(error)
        console.log("ERROR STATUS:", error.statusCode)
        console.log("ERROR BODY:", error.error)

        throw error
    }
}