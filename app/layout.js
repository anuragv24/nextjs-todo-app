import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TodoProvider } from "@/context/TodoContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Todo-App",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body >
        <TodoProvider>
           {children}
        </TodoProvider>
       
        </body>
    </html>
  );
}
