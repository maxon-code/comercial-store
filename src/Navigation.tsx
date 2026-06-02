import { 
  BellAlertIcon, 
  UserIcon, 
  ShoppingCartIcon, 
  InformationCircleIcon,
  Bars3Icon,
  HomeIcon,
  Squares2X2Icon,
  IdentificationIcon,
} from "@heroicons/react/24/solid";
import { useState } from 'react';
import Drawer from './section/Drawer.tsx'; 
import MobileMenu from './section/MobileMenu.tsx'; 
import { useCart } from './hooks/useCart.tsx'; 
import { useModal } from './hooks/useModal';
import { useNotification } from './hooks/useNotification.tsx';
import { categories } from './data/Products.tsx';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const cartItems = useCart((state) => state.cartItems);
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const openModal = useModal((state) => state.openModal);

  const handleSoldOutClick = () => {
    openModal({
      title: "Product Unavailable",
      content: `Sorry, this deck is currently out of stock. Leave your email if you want to get notified when it arrives!`,
      confirmText: "Notify Me",
      onConfirm: () => { console.log("User subscribed"); }
    });
  };

  const showNotification = useNotification((state) => state.showNotification);
  const handleAddToCart = () => {
    showNotification({ title: "Notice", message: `Welcome back to the site.`, type: "info", duration: 1.8 });
  };
  const loginError = () => {
    showNotification({ title: "Error", message: `Функция еще в разработке.`, type: "error", duration: 1.8 });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 pointer-events-none">
      

      <style>{`
        @keyframes doubleKickflip {
          0% {
            transform: perspective(400px) translateY(0) rotateX(0deg) rotateZ(0deg);
          }
          10% {
            transform: perspective(400px) translateY(2px) rotateX(-15deg) rotateZ(2deg);
          }
          50% {
            transform: perspective(400px) translateY(-24px) rotateX(360deg) rotateZ(-6deg);
          }
          85% {
            transform: perspective(400px) translateY(-2px) rotateX(720deg) rotateZ(-2deg);
          }
          100% {
            transform: perspective(400px) translateY(0) rotateX(720deg) rotateZ(0deg);
          }
        }

        @keyframes wheelsSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(1440deg); }
        }

        .group:hover .animate-double-kickflip {
          animation: doubleKickflip 0.85s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .group:hover .animate-wheels-spin {
          animation: wheelsSpin 0.85s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto rounded-2xl bg-slate-900/50 backdrop-blur-md text-white border border-white/5 shadow-lg pointer-events-auto transition-all duration-300">
        

        <div className="hidden md:grid px-4 lg:px-6 py-2 grid-cols-3 items-center gap-2">
          

          <div className="flex items-center gap-1 text-sm font-semibold text-gray-300">
            

            <a href="/home" className="flex items-center justify-center gap-2 p-2 xl:px-3.5 xl:py-2 rounded-xl transition duration-200 hover:bg-white/10 hover:text-white active:scale-95" title="Home">
              <HomeIcon className="w-5 h-5 xl:w-4 xl:h-4 opacity-80 shrink-0" />
              <span className="hidden xl:inline">Home</span>
            </a>


            <div className="relative py-2" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>

              <button className={`p-2 xl:px-3.5 xl:py-2 rounded-xl transition duration-300 flex items-center justify-center gap-2 active:scale-95 text-sm font-semibold ${isDropdownOpen ? 'bg-white/10 text-white' : 'hover:bg-white/10 hover:text-white'}`} title="Products">
                <Squares2X2Icon className="w-5 h-5 xl:w-4 xl:h-4 opacity-80 shrink-0" />
                <span className="hidden xl:inline">Products</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3.5" stroke="currentColor" className={`w-3.5 h-3.5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'} hidden xl:block`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              <div className={`absolute left-0 top-full mt-2 w-52 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/40 shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top p-1.5 z-50 ${isDropdownOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}>
                {categories.map((item, idx) => (

                  <a key={idx} href={item.href} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition duration-200 rounded-lg group">
                    <span className="text-gray-400 group-hover:text-white transition duration-200 shrink-0 w-4 h-4">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </a>
                ))}
              </div>
            </div>


            <a href="/about" className="flex items-center justify-center gap-2 p-2 xl:px-3.5 xl:py-2 rounded-xl transition duration-200 hover:bg-white/10 hover:text-white active:scale-95" title="About Us">
              <IdentificationIcon className="w-5 h-5 xl:w-4 xl:h-4 opacity-80 shrink-0" />
              <span className="hidden xl:inline">About Us</span>
            </a>
          </div>


          <div className="justify-self-center py-1 shrink-0 min-w-[160px] flex flex-col items-center">
            <a href="/home" className="group flex flex-col items-center justify-center select-none outline-none">
              

              <span className="text-[13px] lg:text-[15px] tracking-[0.18em] lg:tracking-[0.22em] font-black uppercase italic font-mono text-zinc-200 group-hover:text-white group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] transition-all duration-300 mb-0.5 pl-[0.18em] lg:pl-[0.22em]">
                057 skateboarding
              </span>

              <div className="relative w-36 lg:w-40 h-7 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                
                <div 
                  className="animate-double-kickflip relative w-full h-full flex items-center justify-center"
                  style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                >
                  

                  <div className="absolute left-8 lg:left-9 bottom-0 flex flex-col items-center z-0" style={{ backfaceVisibility: 'hidden' }}>
                    <div className="w-2 h-1.5 bg-zinc-500" />
                    <div className="animate-wheels-spin w-[18px] h-[18px] bg-zinc-200 rounded-full border-2 border-zinc-400 shadow-sm flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
                    </div>
                  </div>


                  <div className="absolute right-8 lg:right-9 bottom-0 flex flex-col items-center z-0" style={{ backfaceVisibility: 'hidden' }}>
                    <div className="w-2 h-1.5 bg-zinc-500" />
                    <div className="animate-wheels-spin w-[18px] h-[18px] bg-zinc-200 rounded-full border-2 border-zinc-400 shadow-sm flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
                    </div>
                  </div>


                  <div className="absolute top-1 w-[76%] h-2 bg-zinc-300 group-hover:bg-white rounded-sm transition-colors duration-300 z-10 group-hover:shadow-[0_15px_20px_rgba(255,255,255,0.25)]
                    before:content-[''] before:absolute before:right-full before:-mr-[2px] before:top-0 before:w-4 before:h-2 before:bg-inherit before:rounded-l-full before:origin-right before:rotate-[14deg] before:transition-colors
                    after:content-[''] after:absolute after:left-full after:-ml-[2px] after:top-0 after:w-4 after:h-2 after:bg-inherit after:rounded-r-full after:origin-left after:-rotate-[14deg] after:transition-colors"
                  >
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-black/10 rounded-t-sm" />
                  </div>

                </div>
              </div>
            </a>
          </div>

   
          <div className="flex items-center gap-1 lg:gap-2 justify-self-end">
            <button onClick={handleAddToCart} className="p-2 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition active:scale-95">
              <BellAlertIcon className="w-5 h-5" />
            </button>
            <button onClick={handleSoldOutClick} className="p-2 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition active:scale-95">
              <InformationCircleIcon className="w-5 h-5" />
            </button>
            
            <button onClick={() => setIsMenuOpen(true)} className="relative w-9 h-9 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition active:scale-95 flex items-center justify-center shrink-0">
              <ShoppingCartIcon className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5">
                  <span className="absolute inset-0 bg-rose-400 rounded-full animate-ping opacity-75" />
                  <span className="absolute inset-0 bg-rose-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border border-black leading-none">
                    {totalItemsCount}
                  </span>
                </div>
              )}
            </button>
            
            <button onClick={loginError} className="p-2 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition active:scale-95">
              <UserIcon className="w-5 h-5" /> 
            </button>
          </div>
        </div>


        <div className="flex md:hidden px-4 py-2 items-center justify-between">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-gray-300 hover:bg-white/10 hover:text-white transition active:scale-95 rounded-xl">
            <Bars3Icon className="w-6 h-6" />
          </button>


          <a href="/home" className="group flex flex-col items-center justify-center select-none scale-95 mx-1 outline-none">

            <span className="text-[12px] tracking-wider font-black uppercase italic font-mono text-zinc-200 group-hover:text-white group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.4)] transition-all duration-300 mb-0.5">
              057 skate
            </span>
            <div className="relative w-32 h-[22px] flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
              
              <div 
                className="animate-double-kickflip relative w-full h-full flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
              >
                <div className="absolute left-6 bottom-0 flex flex-col items-center" style={{ backfaceVisibility: 'hidden' }}>
                  <div className="w-1.5 h-1 bg-zinc-500" />
                  <div className="animate-wheels-spin w-[14px] h-[14px] bg-zinc-100 rounded-full border border-zinc-400 flex items-center justify-center">
                    <div className="w-1 h-1 bg-zinc-600 rounded-full" />
                  </div>
                </div>
                <div className="absolute right-6 bottom-0 flex flex-col items-center" style={{ backfaceVisibility: 'hidden' }}>
                  <div className="w-1.5 h-1 bg-zinc-500" />
                  <div className="animate-wheels-spin w-[14px] h-[14px] bg-zinc-100 rounded-full border border-zinc-400 flex items-center justify-center">
                    <div className="w-1 h-1 bg-zinc-600 rounded-full" />
                  </div>
                </div>
                

                <div className="absolute top-0.5 w-[74%] h-1.5 bg-zinc-300 group-hover:bg-white rounded-sm transition-colors duration-300 group-hover:shadow-[0_12px_15px_rgba(255,255,255,0.2)]
                  before:content-[''] before:absolute before:right-full before:-mr-[2px] before:top-0 before:w-3 before:h-1.5 before:bg-inherit before:rounded-l-full before:origin-right before:rotate-[12deg]
                  after:content-[''] after:absolute after:left-full after:-ml-[2px] after:top-0 after:w-3 after:h-1.5 after:bg-inherit after:rounded-r-full after:origin-left after:-rotate-[12deg]"
                />
              </div>

            </div>
          </a>

          <button onClick={() => setIsMenuOpen(true)} className="relative w-10 h-10 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition active:scale-95 flex items-center justify-center shrink-0">
            <ShoppingCartIcon className="w-6 h-6" />
            {totalItemsCount > 0 && (
              <div className="absolute top-0 right-0 w-5 h-5">
                <span className="absolute inset-0 bg-rose-400 rounded-full animate-ping opacity-75" />
                <span className="absolute inset-0 bg-rose-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border border-black leading-none">
                  {totalItemsCount}
                </span>
              </div>
            )}
          </button>
        </div>

      </div>

      <Drawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        handleAddToCart={handleAddToCart}
        handleSoldOutClick={handleSoldOutClick}
      />
    </div>
  );
}