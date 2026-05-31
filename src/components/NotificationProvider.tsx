import { useNotification } from "../hooks/useNotification.tsx";
import NotificationCard from "./NotificationCard.tsx";

export default function NotificationProvider() {
  const notifications = useNotification((state) => state.notifications);

  if (notifications.length === 0) return null;

  return (

    <div className="fixed top-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:transform-none z-[110] pointer-events-none w-full max-w-[calc(100%-2rem)] sm:max-w-sm flex flex-col-reverse gap-2">
      

      <style>{`
        @keyframes toastEnter {
          0% { transform: translateY(-30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes toastExit {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-20px); opacity: 0; }
        }
        @keyframes shrinkLine {
          0% { width: 100%; }
          100% { width: 0%; }
        }
      `}</style>


      {notifications.map((item) => (
        <NotificationCard key={item.id} item={item} />
      ))}
    </div>
  );
}