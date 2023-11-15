import { createContext, useState, useContext } from "react";

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

const CartContext = createContext<{cart: Cart, setCart: (cart: Cart) => void}>({cart: emptyCart, setCart: (cart) => {}});

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState<Cart>(emptyCart);

    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);