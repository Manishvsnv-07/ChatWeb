import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UseDataProvider } from "@/context/useDataContext"
import { UserChatProvider } from "@/context/UserChatContext";
import { MessageProvider } from "@/context/MessageNotification";
import { SocketProvider } from "@/context/SocketContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ChatWeb - Connect With People",
  description: "ChatWeb lets you chat with random people and your friends in real-time with end-to-end encryption. Make new connections instantly.",
  keywords: ["chat app", "random chat", "real-time messaging", "encrypted chat", "ChatWeb"],
  openGraph: {
    title: "ChatWeb - Connect With People",
    description: "Real-time chat app with end-to-end encryption.",
    url: "https://chat-web.vercel.app",
    siteName: "ChatWeb",
    images: [
      {
        url: "/imgs/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatWeb - Connect With People",
    description: "Real-time chat app with end-to-end encryption.",
    images: ["/imgs/og-image.png"],
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SocketProvider>
          <MessageProvider>
            <UserChatProvider>
              <UseDataProvider>
                {children}
              </UseDataProvider>
            </UserChatProvider>
          </MessageProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
