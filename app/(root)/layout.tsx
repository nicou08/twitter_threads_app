import "../globals.css";
import { SessionProvider } from "next-auth/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TopBar from "@/components/shared/TopBar";
import BottomBar from "@/components/shared/BottomBar";
import LeftSideBar from "@/components/shared/LeftSideBar/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter-Threads",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body className={`${inter.className} bg-black h-screen`}>
          {/* <TopBar /> */}
          <div className="container h-full mx-auto xl:px-30 max-w-6xl">
            <main className="grid grid-cols-4 h-full">
              <LeftSideBar />

              <section className="col-span-3 lg:col-span-2 border-x[1px] border border-neutral-800">
                {children}
              </section>

              {/* <RightSideBar /> */}
            </main>
          </div>

          {/* <BottomBar /> */}
        </body>
      </html>
    </>
  );
}