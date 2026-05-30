import Navigation from './Navigation.tsx'
import Content from './Content.tsx'
import Card from './Card.tsx'
import {useState} from 'react'

const categories = [
    'All', 'Decks', 'Trucks'
]
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
]

function App() {
    const [activeCategory, setActiveCategory] = useState('Trucks')

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory)

    return (
        <>
            <Navigation/>


            <main className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProducts.map(product =>
                        <Card key={product.id} product={product}/>
                    )}
                </div>
            </main>
        </>
    )
}

export default App
