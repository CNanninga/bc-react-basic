import { useCart, Cart } from "../context/cartContext";
import { bcFetch } from "../utils/bigcommerceGql";

const createCartQuery = `
mutation CreateCart($productId: Int!, $qty: Int!) {
    cart {
        createCart(input: { lineItems: [
            {productEntityId: $productId, quantity: $qty}
        ]}) {
            cart {
                entityId
                id
                amount {
                    currencyCode
                    value
                }
                lineItems {
                    totalQuantity
                }
            }
        }
    }
}
`

const addToCartQuery = `
mutation AddToCart($cartId: String!, $productId: Int!, $qty: Int!) {
    cart {
        addCartLineItems(input: {
            cartEntityId: $cartId
            data: {
                lineItems: [
                    {productEntityId: $productId, quantity: $qty}
                ]
            }
        }) {
            cart {
                entityId
                amount {
                    currencyCode
                    value
                }
                lineItems {
                    totalQuantity
                }
            }
        }
    }
}
`

const createCart:(productId: number, qty: number) => Promise<Cart | null> = async (productId, qty) => {
    const result = await bcFetch<{productId: number, qty: number}>(createCartQuery, {
        productId,
        qty
    });

    const cart = result.data?.cart?.createCart?.cart;

    if (!cart) {
        return null;
    }

    return {
        id: cart.entityId ?? '',
        qty: cart.lineItems?.totalQuantity ?? 0,
        totalFormatted: cart.amount?.value ? `${cart.amount.value} ${cart.amount?.currencyCode}` : '',
    }
}

const doAddToCart:(cartId: string, productId: number, qty: number) => Promise<Cart | null> = async (cartId, productId, qty) => {
    const result = await bcFetch<{cartId: string, productId: number, qty: number}>(addToCartQuery, {
        cartId,
        productId,
        qty
    });

    const cart = result.data?.cart?.addCartLineItems?.cart;

    if (!cart) {
        return null;
    }

    return {
        id: cart.entityId ?? '',
        qty: cart.lineItems?.totalQuantity ?? 0,
        totalFormatted: cart.amount?.value ? `${cart.amount.value} ${cart.amount?.currencyCode}` : '',
    }
}

export default function AddToCart({productId}:{productId: number}) {
    const {cart, setCart} = useCart();

    const addToCart = async () => {
        if (cart.id) {
            const newCart = await doAddToCart(cart.id, productId, 1);
            if (newCart) {
                setCart(newCart);
            }
        } else {
            const newCart = await createCart(productId, 1);
            if (newCart) {
                setCart(newCart);
            }
        }
    }

    return (
        <div className="my-4">
            <button className="bg-blue-700 text-white rounded-lg p-2" onClick={addToCart}>Add to Cart</button>
        </div>
    )
}