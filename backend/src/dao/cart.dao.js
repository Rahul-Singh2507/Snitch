import cartModel from '../models/cart.model.js';

export async function getCartDetails(userId) {
    const cart = await cartModel.findOne({ user: userId }).populate('items.product')

    if (!cart) {
        return null
    }

    const items = cart.items.map(item => {
        const variant = item.variant
            ? item.product?.variants?.find(productVariant => productVariant._id.toString() === item.variant.toString())
            : null

        return {
            ...item.toObject(),
            product: item.product,
            price: variant?.price?.amount != null ? variant.price : item.price
        }
    })

    const totalPrice = items.reduce((sum, item) => {
        const itemAmount = Number(item.price?.amount ?? 0)
        return sum + (itemAmount * item.quantity)
    }, 0)

    return {
        _id: cart._id,
        items,
        totalPrice,
        currency: items[0]?.price?.currency || 'INR'
    }
}