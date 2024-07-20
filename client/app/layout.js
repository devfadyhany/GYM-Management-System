import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./context/AuthContext";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "GYM-Management-System",
  description: "Simple Web application to manage a GYM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <body>
          {children}
          <ToastContainer />
        </body>
      </AuthContextProvider>
    </html>
  );
}
