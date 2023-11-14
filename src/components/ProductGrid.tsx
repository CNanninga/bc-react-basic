import useProducts from "../effects/useProducts";

export default function ProductGrid(
    {limit, setPage}: {limit: number, setPage: (type: string, id?: string) => void}
) {
    const {isLoading, products} = useProducts(limit);

    if (isLoading) {
        return (
            <div>
                Loading ...
            </div>
        )
    }

    return (
        <ul className="grid grid-cols-4 gap-4">
            {products.map(product => (
                <li className="my-8 cursor-pointer" key={product.id}
                    onClick={() => setPage('product', product.id)}>
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