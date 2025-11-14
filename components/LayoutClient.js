"use client";

import { Toaster } from "react-hot-toast";

// Client-side wrapper component for toast notifications
const ClientLayout = ({ children }) => {
  return (
    <>
      {/* Content inside app/page.js files  */}
      {children}

      {/* Show Success/Error messages anywhere from the app with toast() */}
      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
  );
};

export default ClientLayout;
