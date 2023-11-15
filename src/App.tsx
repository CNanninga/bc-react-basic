import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import { useState } from 'react';
import { CartProvider } from './context/cartContext';
import CartLink from './components/CartLink';

function App() {
    const [pageType, setPageType] = useState('products');
    const [pageId, setPageId] = useState('');

    const setPage = (type: string, id: string = '') => {
        setPageType(type);
        setPageId(id);
    }

    return (
        <CartProvider>
            <div>
                <header className="mx-auto my-8 text-center relative max-w-screen-lg">
                    <div className="float-right">
                        <CartLink />
                    </div>
                    <h1 className="text-2xl">My BigCommerce Store</h1>
                </header>
                <main className="mx-auto max-w-screen-lg">
                    
                    {pageType === 'products' &&
                        <ProductGrid limit={15} setPage={setPage} />
                    }

                    {pageType === 'product' &&
                        <ProductDetail id={pageId} setPage={setPage} key={pageId} />
                    }
                </main>
            </div>
        </CartProvider>
    );
}

export default App;
