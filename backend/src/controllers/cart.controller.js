import cartModel from '../models/cart.model.js';
import productModel from '../models/product.model.js';
import { stockOfVariant } from '../dao/product.dao.js';
import { createOrder } from '../services/payment.service.js';
import { getCartDetails } from '../dao/cart.dao.js';
import paymentModel from '../models/payment.model.js';
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils.js';
import { config } from '../config/config.js';




export const addToCart = async (req, res) => {

    const { productId, variantId } = req.params
    const quantity = Number(req.body.quantity || 1)

    const product = variantId
        ? await productModel.findOne({
            _id: productId,
            'variants._id': variantId
        })
        : await productModel.findById(productId)

    if (!product) {
        return res.status(404).json({
            message: 'Product or variant not found',
            success: false
        })
    }

    const cart = (await cartModel.findOne({ user: req.user._id })) ||
        (await cartModel.create({ user: req.user._id }))

    const cartItem = cart.items.find(item => item.product.toString() === productId && item.variant?.toString() === variantId)
    const stock = variantId ? await stockOfVariant(productId, variantId) : null

    if (cartItem) {
        if (variantId && cartItem.quantity + quantity > stock) {
            return res.status(400).json({
                message: `Only ${stock} items left in stock. and you already have ${cartItem.quantity} items in your cart`,
                success: false
            })
        }

        cartItem.quantity += quantity
        await cart.save()

        return res.status(200).json({
            message: 'Cart updated successfully',
            success: true
        })
    }

    if (variantId && quantity > stock) {
        return res.status(400).json({
            message: `Only ${stock} items left in stock`,
            success: false
        })
    }

    const variant = variantId ? product.variants.id(variantId) : null

    cart.items.push({
        product: productId,
        ...(variantId ? { variant: variantId } : {}),
        quantity,
        price: variant?.price?.amount != null ? variant.price : product.price
    })

    await cart.save()

    return res.status(200).json({
        message: 'Product added to cart successfully',
        success: true
    })
}

export const getCart = async (req, res) => {
    const user = req.user

    let cart = await getCartDetails(user._id)

    if (!cart) {
        cart = await cartModel.create({ user: user._id })
    }

    return res.status(200).json({
        message: 'Cart fetched successfully',
        success: true,
        cart
    })
}

export const incrementCartItemQuantity = async (req, res) => {
    const { productId, variantId } = req.params

    const product = variantId
        ? await productModel.findOne({
            _id: productId,
            'variants._id': variantId
        })
        : await productModel.findById(productId)

    if (!product) {
        return res.status(404).json({
            message: 'Product or variant not found',
            success: false
        })
    }

    const cart = await cartModel.findOne({ user: req.user._id })

    if (!cart) {
        return res.status(404).json({
            message: 'Cart not found',
            success: false
        })
    }

    const cartItem = cart.items.find(item => item.product.toString() === productId && item.variant?.toString() === variantId)

    if (!cartItem) {
        return res.status(404).json({
            message: 'Cart item not found',
            success: false
        })
    }

    if (variantId) {
        const stock = await stockOfVariant(productId, variantId)

        if (cartItem.quantity + 1 > stock) {
            return res.status(400).json({
                message: `Only ${stock} items left in stock. and you already have ${cartItem.quantity} items in your cart`,
                success: false
            })
        }
    }

    cartItem.quantity += 1
    await cart.save()

    return res.status(200).json({
        message: 'Cart item quantity incremented successfully',
        success: true
    })
}
export const decrementCartItemQuantity = async (req, res) => {
    const { productId, variantId } = req.params

    const product = variantId
        ? await productModel.findOne({
            _id: productId,
            'variants._id': variantId
        })
        : await productModel.findById(productId)

    if (!product) {
        return res.status(404).json({
            message: 'Product or variant not found',
            success: false
        })
    }


    const cart = await cartModel.findOne({ 
        user: req.user._id 
    })

    if (!cart) {
        return res.status(404).json({
            message: 'Cart not found',
            success: false
        })
    }


    const cartItem = cart.items.find(
        item =>
            item.product.toString() === productId &&
            item.variant?.toString() === variantId
    )


    if (!cartItem) {
        return res.status(404).json({
            message: 'Cart item not found',
            success: false
        })
    }


    if (cartItem.quantity <= 1) {

        cart.items = cart.items.filter(
            item =>
                !(
                    item.product.toString() === productId &&
                    item.variant?.toString() === variantId
                )
        )

    } else {

        cartItem.quantity -= 1

    }


    await cart.save()


    return res.status(200).json({
        message: 'Cart item quantity decremented successfully',
        success: true
    })
}

export const createOrderController = async (req, res) => {


    const cart = await getCartDetails(req.user._id)

    if (!cart || !cart.items.length) {
        return res.status(400).json({
            message: 'Cart is empty',
            success: false
        })
    }

    const order = await createOrder({ amount: cart.totalPrice, currency: cart.currency })

    const payment = await paymentModel.create({
        user: req.user._id,
        razorpay: {
            orderId: order.id,
        },
        price: {
            amount: cart.totalPrice,
            currency: cart.currency
        },
        orderItems: cart.items.map(item => {
            const variant = item.variant
                ? item.product.variants.find(productVariant => productVariant._id.toString() === item.variant.toString())
                : null

            return {
                title: item.product.title,
                productId: item.product._id,
                variantId: item.variant,
                quantity: item.quantity,
                images: variant?.images?.length ? variant.images : item.product.images,
                description: item.product.description,
                price: {
                    amount: variant?.price?.amount ?? item.product.price.amount,
                    currency: variant?.price?.currency ?? item.product.price.currency
                }
            }
        })
    })

    return res.status(200).json({
        message: 'Order created successfully',
        success: true,
        order
    })
}
export const removeCartItem = async (req, res) => {
    try {
        const { productId, variantId } = req.params;

        const cart = await cartModel.findOne({
            user: req.user._id
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
                success: false
            });
        }

        cart.items = cart.items.filter(item => {
            const sameProduct =
                item.product.toString() === productId;

            const sameVariant =
                variantId
                    ? item.variant?.toString() === variantId
                    : true;

            return !(sameProduct && sameVariant);
        });

        await cart.save();

        return res.status(200).json({
            message: "Item removed from cart",
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
export const verifyOrderController = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    } = req.body

    const payment = await paymentModel.findOne({
        'razorpay.orderId': razorpay_order_id,
        status: 'pending'
    })

    if (!payment) {
        return res.status(400).json({
            message: 'Payment not found',
            success: false
        })
    }

    const isPaymentValid = validatePaymentVerification({
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
    }, razorpay_signature, config.RAZORPAY_KEY_SECRET)

    if (!isPaymentValid) {
        payment.status = 'failed'
        await payment.save()

        return res.status(400).json({
            message: 'Payment verification failed',
            success: false
        })
    }

    payment.status = 'paid'

    payment.razorpay.paymentId = razorpay_payment_id
    payment.razorpay.signature = razorpay_signature

    await payment.save()

    return res.status(200).json({
        message: 'Payment verified successfully',
        success: true
    })
}