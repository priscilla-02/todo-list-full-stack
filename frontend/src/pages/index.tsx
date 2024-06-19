import { Inter } from "next/font/google";
import LandingPage from "./landingpage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between desktop:p-24 pt-32 px-10 ${inter.className} bg-gray-500`}
    >
      <LandingPage />
    </main>
  );
}
