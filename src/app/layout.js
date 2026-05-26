import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "KindredPaws - Pet Adoption",
  description: "Find your new best friend today.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {/* Main content will be rendered here */}
        <Toaster position="top-center" reverseOrder={false} />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}