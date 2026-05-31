import { useEffect, useState } from "react";
import { useModal } from '../hooks/useModal.tsx';

export default function ModalProvider() {
  const { isOpen, options, closeModal } = useModal();

  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !options) return null;


  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeModal();
      setIsClosing(false);
    }, 150);
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-150 ${
        isClosing ? 'animate-[fadeOut_0.15s_linear_forwards]' : 'animate-[fadeIn_0.15s_linear]'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`bg-[#242C3A] w-full max-w-md rounded-xl border border-slate-700/60 shadow-2xl shadow-black/50 p-6 relative overflow-hidden transition-all duration-150 ${
          isClosing ? 'animate-[scaleDown_0.15s_ease-in_forwards]' : 'animate-[scaleUp_0.15s_ease-out]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-indigo-500" />

        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 p-2 rounded-full bg-transparent hover:bg-[#1E2530] text-gray-400 hover:text-white transition flex items-center justify-center active:scale-95 duration-200"
        > 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button> 
        <div className="mb-4 pr-10">
          <h2 className="text-xl font-bold text-white tracking-wide">
            {options.title}
          </h2>
        </div>


        <div className="text-sm text-slate-300 leading-relaxed mb-6">
          {options.content}
        </div>


        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-700/40">
          

          <button 
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white rounded-full bg-transparent hover:bg-[#1E2530] transition flex items-center justify-center active:scale-95 duration-200"
          >
            Cancel
          </button>
          
          {options.onConfirm && (
            <button 
              onClick={() => {
                options.onConfirm?.();
                handleClose();
              }}
              className="px-4 py-2 text-sm font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg shadow-blue-500/20 active:scale-95 transition-all duration-200"
            >
              {options.confirmText || 'Confirm'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}