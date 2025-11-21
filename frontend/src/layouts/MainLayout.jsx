import { Outlet } from "react-router-dom";
import Footer from "../components/minorComponents/Footer";
import Header from "../components/minorComponents/Header";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className=" flex-1 p-4  ">
        <div className="relative z-10 p-4 w-full">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
