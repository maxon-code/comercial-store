import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  XMarkIcon,
  HomeIcon,
  InformationCircleIcon,
  BellAlertIcon,
  UserIcon
} from "@heroicons/react/24/solid";
import { categories } from '../data/Products.tsx'; 

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  handleAddToCart: () => void;
  handleSoldOutClick: () => void;
}

export default function MobileMenu({ isOpen, onClose, handleAddToCart, handleSoldOutClick }: MobileMenuProps) {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const mobileMenuHTML = (
    <>
      <div
        className={`fixed inset-0 z-[9998] bg-black/60 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 z-[9999] h-full w-[88vw] sm:w-[450px] bg-[#242C3A] p-8 flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 visible pointer-events-auto' : '-translate-x-full invisible pointer-events-none'
        }`}
      >

        <div className="flex justify-between items-center pb-5 border-b border-gray-700/60">
          <span className="text-xl font-bold tracking-wide text-white">Navigation</span>
          <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-[#1E2530] hover:text-white transition active:scale-95"> 
            <XMarkIcon className="w-6 h-6" />
          </button> 
        </div>


        <div className="flex-1 overflow-y-auto py-6 space-y-8 my-2 pr-1 scrollbar-thin">
          

          <div className="flex flex-col gap-1">
            <a href="/home" onClick={onClose} className="flex items-center gap-4 px-5 py-4 text-base font-semibold text-white bg-[#1E2530]/50 border border-gray-700/40 rounded-xl hover:bg-blue-500 transition group">
              <HomeIcon className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors" />
              Home
            </a>
          </div>


          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Products</p>
            <div className="grid grid-cols-1 gap-2.5">
              {categories.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between bg-[#1E2530]/40 p-4 rounded-xl border border-gray-700/30 hover:border-blue-500 hover:bg-blue-500 group transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#1E2530] border border-gray-700/50 rounded-xl flex items-center justify-center text-blue-500 group-hover:text-white group-hover:bg-blue-600 transition p-2.5">
                      {item.icon}
                    </div>
                    <span className="text-base font-semibold text-white">{item.name}</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </a>
              ))}
            </div>
          </div>


          <div className="flex flex-col gap-1">
            <a href="/about" onClick={onClose} className="flex items-center gap-4 px-5 py-4 text-base font-semibold text-white bg-[#1E2530]/50 border border-gray-700/40 rounded-xl hover:bg-blue-500 transition group">
              <InformationCircleIcon className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors" />
              About Us
            </a>
          </div>
        </div>


        <div className="pt-5 border-t border-gray-700/60 mt-auto grid grid-cols-3 gap-3">
          <button onClick={() => { onClose(); handleAddToCart(); }} className="py-3.5 rounded-xl bg-[#1E2530] text-gray-400 hover:text-white hover:bg-blue-500 transition flex items-center justify-center active:scale-95 border border-gray-700/30">
            <BellAlertIcon className="w-5 h-5" />
          </button>
          <button onClick={() => { onClose(); handleSoldOutClick(); }} className="py-3.5 rounded-xl bg-[#1E2530] text-gray-400 hover:text-white hover:bg-blue-500 transition flex items-center justify-center active:scale-95 border border-gray-700/30">
            <InformationCircleIcon className="w-5 h-5" />
          </button>
          <button onClick={onClose} className="py-3.5 rounded-xl bg-[#1E2530] text-gray-400 hover:text-white hover:bg-blue-500 transition flex items-center justify-center active:scale-95 border border-gray-700/30">
            <UserIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );

  if (typeof window === 'undefined') return null;
  return createPortal(mobileMenuHTML, document.body);
}