import { Outlet } from "react-router";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";

export default function RootLayout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}