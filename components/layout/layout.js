import { Toaster } from "react-hot-toast";
import Footer from "./footer";
import Navbar from "./navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <Navbar />
      <main className="grow bg-gray-100 dark:bg-stone-600">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
