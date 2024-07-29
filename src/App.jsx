// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import authService from "./appwrite/auth";
// import { login, logout } from "./store/authSlice";
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";

// const App = () => {
//   const [loading, setLoading] = useState(true); // Corrected useState usage
//   const dispatch = useDispatch();

//   useEffect(() => {
//     authService.getCurrentUser()
//       .then((userData) => {
//         if (userData) {
//           dispatch(login({ userData }));
//         } else {
//           dispatch(logout());
//         }
//       })
//       .finally(() => setLoading(false));
//   }, [dispatch]);

//   return !loading ? (
//     <div className="min-h-screen flex flex-wrap content-between bg-gray-500">
//       <div className="w-full block ">
//         <Header />
//         <Footer />
//       </div>
//     </div>
//   ) : null;
// };

// export default App;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(authService); // Check if authService is correctly imported
    console.log(typeof authService.getCurrentUser); // Ensure getCurrentUser is a function

    // Ensure getCurrentUser is a function before calling it
    if (typeof authService.getCurrentUser === "function") {
      authService
        .getCurrentUser()
        .then((userData) => {
          if (userData) {
            dispatch(login({ userData })); // Ensure this matches the expected payload
          } else {
            dispatch(logout());
          }
        })
        .catch((error) => {
          console.error("Error fetching current user:", error);
          dispatch(logout());
        })
        .finally(() => setLoading(false));
    } else {
      console.error("authService.getCurrentUser is not a function");
      setLoading(false);
    }
  }, [dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-500">
      <div className="w-full block">
        <Header />
        A blog site with app write
        <Footer />
      </div>
    </div>
  ) : (
    // Optional: Add a loading indicator
    <div className="flex items-center justify-center h-screen">
    <div className="w-44 h-44 border-8 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
  );
};

export default App;
