import { useCart } from "../context/cartContext";

export default function CartLink() {
    const {cart} = useCart();

    return (
        <a>
            Cart ({cart.qty})
            {cart.id && (
                <span>({cart.totalFormatted})</span>
            )}
        </a>
    )
}