
import { useNotification } from "../hooks/useNotification.tsx";

import type { NotificationItem } from "../hooks/useNotification.tsx";

interface NotificationCardProps {
  item: NotificationItem;
}

export default function NotificationCard({ item }: NotificationCardProps) {
  const hideNotification = useNotification((state) => state.hideNotification);

  const handleWrapperAnimationEnd = (e: React.AnimationEvent) => {

    if (e.animationName === "toastExit") {
      hideNotification(item.id);
    }
  };

  const userDuration = item.duration || 3;
  const enterDuration = 0.2;
  const exitDuration = 0.2;
  const exitDelay = enterDuration + userDuration;

  const typeConfig = {
    success: {
      accent: 'from-green-500 to-emerald-500',
      iconColor: 'text-green-400',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      )
    },
    error: {
      accent: 'from-red-500 to-rose-500',
      iconColor: 'text-red-400',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      )
    },
    warning: {
      accent: 'from-amber-500 to-yellow-500',
      iconColor: 'text-amber-400',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      )
    },
    info: {
      accent: 'from-blue-500 to-indigo-500',
      iconColor: 'text-blue-400',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.852l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
      )
    }
  };

  const currentConfig = typeConfig[item.type || 'info'] || typeConfig.info;

  return (
    <div
      onAnimationEnd={handleWrapperAnimationEnd}
      style={{
        animation: `
          toastEnter ${enterDuration}s ease-out forwards,
          toastExit ${exitDuration}s ease-in forwards ${exitDelay}s
        `
      }}
      className="bg-[#242C3A]/95 backdrop-blur-md w-full rounded-xl border border-slate-700/60 shadow-xl shadow-black/40 p-4 pt-5 relative overflow-hidden pointer-events-auto"
    >

      <div 
        style={{
          animation: `shrinkLine ${userDuration}s linear forwards ${enterDuration}s`
        }}
        className={`absolute top-0 left-0 h-[3px] bg-gradient-to-r ${currentConfig.accent}`} 
      />

      <div className="flex items-start gap-3 pl-1">
        <div className={`shrink-0 mt-0.5 ${currentConfig.iconColor}`}>
          {currentConfig.icon}
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-white tracking-wide mb-1 leading-tight">
            {item.title}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {item.message}
          </p>
        </div>
      </div>
    </div>
  );
}