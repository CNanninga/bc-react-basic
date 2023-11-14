import { useState, useRef, useEffect } from "react";
import { bcFetch } from "../utils/bigcommerceGql";

const fetchProductQuery = `
query GetProducts($id: ID) {
    site {
        product(id: $id) {
            sku
            name
            description
            defaultImage {
                url(width: 750)
            }
        }
    }
}
`

type ProductDetail = {
    sku: string,
    name: string,
    description: string,
    defaultImage?: {
        url: string
    }
}

const emptyProduct:ProductDetail = {
    sku: '',
    name: '',
    description: '',
}

const fetchProduct:(id: string) => Promise<ProductDetail> = async (id) => {
    const result = await bcFetch<{id: string}>(fetchProductQuery, {
        id
    });

    return result.data?.site?.product ?? emptyProduct;
}

export default function useProduct(id: string) {
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState<ProductDetail>(emptyProduct);
    const loaded = useRef(false);

    useEffect(() => {
        if (!loaded.current) {
            fetchProduct(id).then((product: ProductDetail) => {
                setProduct(product);
                setIsLoading(false);  
            })
        }
        loaded.current = true;
    }, []);

    return {
        isLoading,
        product,
    }
}