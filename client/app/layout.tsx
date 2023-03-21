import "./globals.css";
import Providers from "./Providers";
import Navbar from "./components/Navbar/Navbar";

export const metadata = {
  title: "PCCUResume",
  description: "PCCU's internship platform",
  icons: {
    icon: "/PCCUResume.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="bg-gray-100 min-h-screen w-full min-w-[320px] font-sans">
            <Navbar />
            <main className="md:max-w-[860px] lg:max-w-[1140px] m-auto">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
