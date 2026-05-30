import {Card, CardSkeleton} from '../Card.tsx'
import {useState} from 'react'


const products = [
    {
        id: 1,
        name: 'Santa Cruz deck',
        price: 100,
        category: 'Decks',
        image: "../public/decks/santa-cruz-classic.png",
    },
    {
        id: 2,
        name: 'Hayley Clean Cut  deck',
        price: 110,
        category: 'Decks',
        image: "../public/decks/hayley-clean-cut.png",
    },
    {
        id: 3,
        name: 'Hayley Clean Cut  deck',
        price: 110,
        category: 'Trucks',
        image: "../public/decks/silver-truck.png",
    },
    {
        id: 4,
        name: 'Hayley Clean Cut  deck',
        price: 110,
        category: 'Trucks',
        image: "../public/decks/silver-truck.png",
    },
]

export default function CardSection() {
    const [activeCategory] = useState('All')
    const [loading, setLoading] = useState(true)
    setTimeout(() => setLoading(false), 1500)

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory)

    return (            <main className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {
                            loading ? Array(4).fill(0).map((_, i) => <CardSkeleton key={i}/>)
                                :
                        filteredProducts.map(product =>
                            <Card key={product.id} product={product}/>
                        )
                        }
                    </div>
                </main>)

}