import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '../hooks/useCart.tsx';
import products from '../data/Products.tsx';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  const cartItems = useCart((state) => state.cartItems);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const totalItemsCount = useCart((state) => state.totalItemsCount());


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const fullCartItems = useMemo(() => {
    return cartItems.map((item) => {
      const productInfo = products.find((p) => p.id === Number(item.id));
      return {
        ...item,
        name: productInfo ? productInfo.name : 'Unknown Product',
        price: productInfo ? productInfo.price : 0,
        image: productInfo ? productInfo.image : '',
        category: productInfo ? productInfo.category : '',
      };
    });
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return fullCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [fullCartItems]);

  const drawerHTML = (
    <>

      <div
        className={`fixed inset-0 z-[9998] bg-black/60 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />


      <div
        className={`fixed top-0 right-0 z-[9999] h-full w-85 sm:w-96 bg-[#242C3A] p-6 flex flex-col transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'translate-x-0 shadow-2xl visible pointer-events-auto' 
            : 'translate-x-full shadow-none invisible pointer-events-none'
        }`}
      >

        <div className="flex justify-between items-center pb-4 border-b border-gray-700"> 
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-blue-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <p className="text-lg font-semibold text-white">Корзина</p> 
            {totalItemsCount > 0 && (
              <span className="bg-[#1E2530] text-gray-400 text-xs px-2 py-0.5 rounded-full font-medium">
                {totalItemsCount}
              </span>
            )}
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full bg-transparent hover:bg-[#1E2530] text-gray-400 hover:text-white transition flex items-center justify-center"
          > 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button> 
        </div>


        <div className="flex-1 overflow-y-auto py-4 space-y-4 my-2 pr-1 scrollbar-thin">
          {fullCartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-2 opacity-60">
              <span className="text-4xl">🛒</span>
              <p className="text-sm text-gray-300">Ваша корзина пуста</p>
            </div>
          ) : (
            fullCartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 bg-[#1E2530]/50 p-3 rounded-xl border border-gray-700/30 hover:border-gray-700 transition">
                <div className="w-16 h-16 bg-[#1E2530] rounded-lg flex items-center justify-center overflow-hidden p-1 shadow-inner">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain select-none" />
                  ) : (
                    <span className="text-xl">🛹</span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white truncate">{item.name}</h4>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">Категория: {item.category}</p>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-semibold text-blue-500">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                    
                    <div className="flex items-center bg-[#1E2530] rounded-lg px-2 py-1 gap-3 border border-gray-700/50 select-none">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-400 hover:text-white text-sm font-bold px-1 transition-colors"
                      >
                        -
                      </button>
                      <span className="text-xs text-white font-bold min-w-[12px] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-400 hover:text-white text-sm font-bold px-1 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-1.5 text-gray-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition self-start"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>


        <div className="pt-4 border-t border-gray-700 mt-auto space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Доставка</span>
            <span className="text-white font-medium">
              {totalPrice > 0 ? 'Бесплатно' : '$0'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-base text-gray-300">Итого:</span>
            <span className="text-xl font-bold text-white">${totalPrice.toLocaleString()}</span>
          </div>
          
          <button 
            disabled={cartItems.length === 0}
            className="w-full bg-blue-500 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <span>Оформить заказ</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7m7.5-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );

  if (typeof window === 'undefined') return null;
  return createPortal(drawerHTML, document.body);
}