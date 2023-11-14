import { useState, useEffect, useRef } from "react";
import { bcFetch } from "../utils/bigcommerceGql";

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
    defaultImage?: {
        url: string
    }
}

const fetchProducts:(limit: number) => Promise<Product[]> = async (limit) => {
    const result = await bcFetch<{limit: number}>(fetchProductsQuery, {
        limit
    })
    
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
            fetchProducts(limit).then((products: Product[]) => {
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