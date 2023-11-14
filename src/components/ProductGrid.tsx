import useProducts from "../effects/useProducts";

export default function ProductGrid({limit}: {limit: number}) {
    const {isLoading: productsLoading, products} = useProducts(limit);

    if (productsLoading) {
        return (
            <div>
                Loading ...
            </div>
        )
    }

    return (
        <ul className="grid grid-cols-4 gap-4">
            {products.map(product => (
                <li className="my-8" key={product.id}>
                    {product.defaultImage?.url && (
                        <div className="border border-slate-700">
                            <img src={product.defaultImage.url} />
                        </div>
                    )}
                    <h2 className="bold text-xl">{product.name}</h2>
                    SKU: {product.sku}
                </li>
            ))}
        </ul>
    )
}