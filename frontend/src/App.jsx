import "./App.css";
import Talent from "./pages/Talent";
import MainLayout from "./layouts/MainLayout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ViewTalent from "./pages/ViewTalent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // import styles
import { useSelector } from "react-redux";


function App() {
  const {theme} =useSelector((state)=>state.theme)
  return (
    <>
      <div className="flex flex-col bg-slate-100 text-black dark:bg-slate-800 dark:text-white min-h-[100vh] w-[100vw] relative overflow-hidden">
        <Routes>
     
          <Route element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="/viewTalent/:_id" element={<ViewTalent />} />
            {/* <Route path="/talent" element={<Talent />} /> */}
          </Route>
        </Routes>

         <ToastContainer
        position="top-center"
        autoClose={3000} // 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme==="dark" ? "dark":"light" } 
      />
      </div>
    </>
  );
}

export default App;
