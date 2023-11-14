import useProduct from "../effects/useProduct";

export default function ProductDetail(
    {id, setPage}: {id: string, setPage: (type: string, id?: string) => void}
) {
    const {isLoading, product} = useProduct(id);

    if (isLoading) {
        return (
            <div>
                Loading ...
            </div>
        )
    }

    return (
        <div>
            <div>
                <button className="text-sky-700 hover:underline"
                    onClick={() => setPage('products')}>Back to products</button>
            </div>
            <div className="flex gap-4">
                <div className="flex-none w-1/2">
                    {product.defaultImage?.url && (
                        <img src={product.defaultImage.url} />
                    )}
                </div>
                <div className="flex-1 w-1/2">
                    <h1 className="text-2xl">{product.name}</h1>
                    <p>SKU: {product.sku}</p>
                    <p className="my-8" dangerouslySetInnerHTML={{ __html: product.description}}></p>
                </div>
            </div>
        </div>
    )
}