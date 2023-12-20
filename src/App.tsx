import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import { useState } from 'react';
import { CartProvider } from './context/cartContext';
import { CustomerProvider } from './context/customerContext';
import CartLink from './components/CartLink';
import AccountLinks from './components/AccountLinks';
import Login from './components/Login';

function App() {
    const [pageType, setPageType] = useState('products');
    const [pageId, setPageId] = useState('');

    const setPage = (type: string, id: string = '') => {
        setPageType(type);
        setPageId(id);
    }

    return (
        <CustomerProvider>
            <CartProvider>
                <div>
                    <header className="mx-auto my-8 text-center relative max-w-screen-lg">
                        <div className="float-right">
                            <CartLink />
                            <AccountLinks setPage={setPage} />
                        </div>
                        <h1 className="text-2xl">
                            <a className="cursor-pointer" onClick={() => setPage('products')}>My BigCommerce Store</a>
                        </h1>
                    </header>
                    <main className="mx-auto max-w-screen-lg">
                        
                        {pageType === 'products' &&
                            <ProductGrid limit={15} setPage={setPage} />
                        }

                        {pageType === 'product' &&
                            <ProductDetail id={pageId} setPage={setPage} key={pageId} />
                        }

                        {pageType === 'login' &&
                            <Login setPage={setPage} />
                        }
                    </main>
                </div>
            </CartProvider>
        </CustomerProvider>
    );
}

export default App;
