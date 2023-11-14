import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import { useState } from 'react';

function App() {
    const [pageType, setPageType] = useState('products');
    const [pageId, setPageId] = useState('');

    const setPage = (type: string, id: string = '') => {
        setPageType(type);
        setPageId(id);
    }

    return (
        <div>
            <header className="m-8 text-center text-2xl">
                My BigCommerce Store
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
    );
}

export default App;
