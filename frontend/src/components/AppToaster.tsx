import { Toaster } from "react-hot-toast";

export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3500,
        style: {
          background: "#111827", // dark background
          color: "#fff",
          fontSize: "14px",
        },
        success: {
          iconTheme: {
            primary: "#4ade80", // green
            secondary: "#111827",
          },
        },
        error: {
          iconTheme: {
            primary: "#f87171", // red
            secondary: "#111827",
          },
        },
      }}
    />
  );
}
