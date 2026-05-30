import { PlusIcon } from "@heroicons/react/24/outline";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css'

export function CardSkeleton() {
    return (
        <SkeletonTheme baseColor="#2D3748" highlightColor="#3A4659">
            <div className="bg-[#242C3A] rounded-lg overflow-hidden border border-slate-700/50 shadow-lg group cursor-pointer">
                
                <div className="aspect-square w-full">
                    <Skeleton 
                        className="block h-full w-full" 
                        containerClassName="block h-full leading-none" 
                    />
                </div>

                <div className="p-3 space-y-3">
                    <div className="h-4 w-1/3">
                        <Skeleton className="block h-full" containerClassName="block" />
                    </div>

                    <div className="h-7 w-5/6">
                        <Skeleton className="block h-full" containerClassName="block" />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <div className="w-8 h-8">
                            <Skeleton circle className="block h-full" containerClassName="block h-full leading-none" />
                        </div>
                    </div>
                </div>

            </div>
        </SkeletonTheme>
    );
}
interface Product {
    id: number | string;
    image: string;
    name: string;
    category: string;
    price: number | string;
}

interface CardProps {
    product: Product;
}
export function Card({product: { id, name, price, category, image } } : CardProps) {
    return (
        <div key={id}
             className="bg-[#242C3A] rounded-lg overflow-hidden border border-slate-700/50 shadow-lg group cursor-pointer transition-shadow">

            <div className="aspect-square w-full overflow-hidden p-4 bg-[#1E2530]"> 
                <img 
                    src={image} 
                    alt={name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="p-3 space-y-3">

                <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wide block leading-none">
                        {category}
                    </span>
                </div>

                <div>
                    <h3 className="font-medium text-white text-lg leading-tight line-clamp-1">
                        {name}
                    </h3>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <span className="font-bold text-white text-xl">
                        ${price}
                    </span>

                    <button
                        className="p-1.5 rounded-full bg-slate-700 text-white hover:bg-blue-500 hover:scale-110 transition-all duration-300">
                        <PlusIcon className="w-5 h-5" />
                    </button>
                </div>

            </div>

        </div>
    );
}