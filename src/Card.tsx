import { PlusIcon } from "@heroicons/react/24/outline";
export default function Card({product}) {

    return (
        <div key={product.id}
             className="bg-black/50 rounded-lg overflow-hidden border border-stone-500 hover:shadow-lg shadow-amber-50 transition-shadow group cursor-pointer">

            <div className="aspect-square overflow-hidden bg-stone-100/50">
                <img src={product.image} alt={product.name}
                     className="w-full h-full object-center hover:scale-105 transition-transform duration-300"
                />

            </div>

            <div className="p-3">

                <span className="text-xs text-white uppercase tracking-wide">{product.category}</span>

                <h3 className="font-medium text-white mt-1 text-sm">{product.name}</h3>

                <div className="flex items-center justify-between mt-2">

                    <span className="font-bold text-white">${product.price}</span>

                    <button
                        className="p-2 rounded-full bg-stone-100 hover:bg-blue-500 hover:text-white transition-colors duration-300">

                        <PlusIcon className="w-5 h-5" />

                    </button>
                </div>

            </div>

        </div>
    )
}