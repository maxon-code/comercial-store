import { PlusIcon, CheckIcon } from "@heroicons/react/24/outline";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useCart } from './hooks/useCart.tsx'; 
import Drawer from './section/Drawer.tsx'; 

import 'react-loading-skeleton/dist/skeleton.css'
import { useState } from "react";

export function CardSkeleton() {
    return (
        <SkeletonTheme baseColor="#2D3748" highlightColor="#3A4659">
            <div className="bg-[#242C3A] rounded-lg overflow-hidden border border-slate-700/50 shadow-lg group">
                
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
    count: number;
    price: number | string;
}

interface CardProps {
    product: Product;
}

export function Card({ product: { id, name, price, category, count, image } }: CardProps) {
    const addToCart = useCart((state) => state.addToCart);
    const isAdded = useCart((state) => state.cartItems.some((item) => item.id === id));
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div key={id}
             className="bg-[#242C3A] rounded-lg overflow-hidden border border-slate-700/50 shadow-lg group cursor-pointer transition-shadow">


            <div className="aspect-square w-full overflow-hidden bg-[#1E2530] flex items-center justify-center p-6"> 
                <img 
                    src={image} 
                    alt={name}
                    className="max-w-[85%] max-h-[85%] object-contain hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="p-3 space-y-3">

    <div className="flex items-center justify-between flex-wrap gap-x-2 gap-y-1">
        

        <span className="text-xs text-slate-400 uppercase tracking-wide block leading-none truncate max-w-[50%]">
            {category}
        </span>


        <div className="flex items-center gap-2 select-none shrink-0">
            <div className="flex items-center justify-center w-3 h-3">
                <span 
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        count === 0 
                        ? 'bg-slate-500 outline outline-4 outline-slate-500/20 shadow-sm shadow-slate-500/40' 
                        : count < 5 
                            ? 'bg-amber-500 outline outline-4 outline-amber-500/20 shadow-sm shadow-amber-500/40 animate-pulse' 
                            : 'bg-green-500 outline outline-4 outline-green-500/20 shadow-sm shadow-green-500/40'
                    }`} 
                />
            </div>
            
            <span className="text-xs font-medium text-slate-300 leading-none">
                {count === 0 ? (
                    <span className="text-slate-500">Out of stock</span>
                ) : (
                    <>
                        <span className="font-bold text-white">{count}</span> In stock
                    </>
                )}
            </span>
        </div>
    </div>
    


                <div>
                    <h3 className="font-medium text-white text-lg leading-tight line-clamp-1">
                        {name}
                    </h3>
                </div>

                <div className="flex items-center justify-between pt-2">
                    {count <= 0 ? (
                        <span className="font-bold text-red-500 text-base">
                            SOLD OUT
                        </span>
                    ) : (
                        <span className="font-bold text-white text-xl">
                            ${price}
                        </span>
                    )} 

                    {count > 0 && (
                        <button
                            onClick={() => {
                                if (!isAdded) {
                                    addToCart(id);
                                }
                                setIsMenuOpen(true);
                            }}
                            className={`p-1.5 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
                                isAdded 
                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
                                : 'bg-slate-700 text-white hover:bg-blue-500'
                            }`}
                        >
                            {isAdded ? (
                                <CheckIcon className="w-5 h-5 animate-[scaleUp_0.2s_ease-out_forwards]" />
                            ) : (
                                <PlusIcon className="w-5 h-5" />
                            )}
                        </button>
                    )}

                    <Drawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
                </div>
            </div>
        </div>
    );
}