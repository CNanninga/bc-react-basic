import { useCart } from "../context/cartContext";

export default function CartLink() {
    const {cart} = useCart();

    return (
        <div>
            <a>
                Cart ({cart.qty})
                {cart.id && (
                    <span>({cart.totalFormatted})</span>
                )}
            </a>
        </div>
    )
}