import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "universal-cookie";
import { bcFetch } from "../utils/bigcommerceGql";

export type Cart = {
    id?: string,
    qty: number,
    totalFormatted: string,
}

const emptyCart = {
    id: null,
    qty: 0,
    totalFormatted: '',
}

const getCartQuery = `
query GetCart($entityId: String) {
    site {
        cart(entityId: $entityId) {
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
`

const CartContext = createContext<{cart: Cart, setCart: (cart: Cart) => void}>({cart: emptyCart, setCart: (cart) => {}});

export const CartProvider = ({children}) => {
    const [cart, setCartState] = useState<Cart>(emptyCart);
    const cookies = new Cookies();

    const setCart: (cart: Cart) => void = (cart) => {
        setCartState(cart);
        cookies.set('cartId', cart.id, { path: '/' });
    }

    useEffect(() => {
        const cartId = cookies.get('cartId');
        if (cartId) {
            bcFetch<{entityId: string}>(getCartQuery, {
                entityId: cartId,
            }).then(result => {
                const cart = result.data?.site.cart;
    
                setCartState({
                    id: cart.entityId ?? '',
                    qty: cart.lineItems?.totalQuantity ?? 0,
                    totalFormatted: cart.amount?.value ? `${cart.amount.value} ${cart.amount?.currencyCode}` : '',
                })
            });
        }
    }, []);

    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);