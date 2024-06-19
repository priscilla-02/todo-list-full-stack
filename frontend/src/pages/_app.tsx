import { NotificationContextProvider } from "@/hooks/useNotifcation";
import { ProfileContextProvider } from "@/hooks/useProfile";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProfileContextProvider>
      <NotificationContextProvider>
        <Component {...pageProps} />
      </NotificationContextProvider>
    </ProfileContextProvider>
  );
}
