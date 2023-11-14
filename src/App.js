import logo from './logo.svg';
import ProductGrid from './components/ProductGrid.tsx';
import { useState } from 'react';

function App() {
    const [test, setTest] = useState(0);

    const increment = () => {
        console.log('increment');
        setTest(test+1);
    }

    return (
        <div>
            <header className="m-8 text-center text-2xl">
                My BigCommerce Store
            </header>
            <div className="mx-auto max-w-screen-lg">
                <button onClick={increment}>{test}</button>
            </div>
            <main className="mx-auto max-w-screen-lg">
                <ProductGrid limit={4} />
            </main>
        </div>
    );
}

export default App;
