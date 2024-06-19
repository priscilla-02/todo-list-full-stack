import { useNotification } from "@/hooks/useNotifcation";

const NotificationsPopup = () => {
  const { notification } = useNotification();
  return (
    notification && (
      <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-700 p-2 border shadow-md z-[999] rounded-lg`}>
        <p className="desktop:text-lg text-xs text-center">{notification.text}</p>
      </div>
    )
  );
};

export default NotificationsPopup;