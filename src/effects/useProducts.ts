import { useState, useEffect, useRef } from "react";

const fetchProductsQuery = `
query GetProducts($limit: Int) {
    site {
        products(first: $limit) {
            edges {
                node {
                    id
                    sku
                    name
                    defaultImage {
                        url(width: 500)
                    }
                }
            }
        }
    }
}
`

type Product = {
    id: string,
    sku: string,
    name: string,
    defaultImage: {
        url: string
    }
}

const fetchProducts:() => Promise<Product[]> = async () => {
    const storeHash = process.env.REACT_APP_STORE_HASH;
    const channelId = process.env.REACT_APP_CHANNEL;
    const gqlToken = process.env.REACT_APP_GQL_TOKEN;

    const result = await fetch(`https://store-${storeHash}-${channelId}.mybigcommerce.com/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${gqlToken}`
        },
        body: JSON.stringify({
            query: fetchProductsQuery,
            variables: {
                limit: 4
            }
        })
    }).then(resp => resp.json())
    
    const products = result.data?.site?.products?.edges ?? [];

    return products.map((product: { node: Product }) => {
        return product.node ?? {};
    })
}

export default function useProducts(limit: number) {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const loaded = useRef(false);

    useEffect(() => {
        if (!loaded.current) {
            fetchProducts().then((products: Product[]) => {
                setProducts(products);
                setIsLoading(false);
            })
        }
        loaded.current = true;
    }, []);

    return {
        isLoading,
        products,
    }
}