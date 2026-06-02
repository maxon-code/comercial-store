import {Card, CardSkeleton} from '../Card.tsx'
import {useState, useEffect} from 'react'
import products from '../data/Products.tsx'


export default function CardSection() {
    const [activeCategory] = useState('All')
    const [loading, setLoading] = useState(true)
    

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory)

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {loading 
                    ? Array(4).fill(0).map((_, i) => <CardSkeleton key={i}/>)
                    : filteredProducts.map(product => <Card key={product.id} product={product}/>)
                }
            </div>
        </main>
    )
}