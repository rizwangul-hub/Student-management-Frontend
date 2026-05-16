import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Student Management System",
  description: "Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* Toast notifications */}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
