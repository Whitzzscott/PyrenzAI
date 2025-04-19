import React from "react";
import ReactDOM from "react-dom/client";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface AlertProps {
  type: "error" | "info";
  message: string;
  onClose: () => void;
}

export function Alert({ type, message, onClose }: AlertProps) {
  const alertStyles = {
    error: "border rounded-md border-red-500 bg-red-500/10 text-white",
    info: "border rounded-md border-blue-500 bg-blue-500/10 text-white", // Updated to text-white
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeOut" } }}
      >
        <motion.div
          className={`p-6 shadow-2xl w-11/12 sm:w-[400px] flex items-center justify-between relative ${alertStyles[type]}`}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: -300, scale: 1 }}
          exit={{
            opacity: 0,
            y: 40,
            scale: 0.8,
            rotate: -8,
            transition: { duration: 0.35, ease: "easeInOut" },
          }}
        >
          <p className="text-lg font-semibold font-baloo">{message}</p>
          <button
            className="ml-4 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xl hover:scale-110 transition-all duration-300"
            onClick={onClose}
            aria-label="Close alert"
          >
            <FaTimes />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

export function WindowAlert(type: "error" | "info", message: string) {
  const alertContainer = document.createElement("div");
  document.body.appendChild(alertContainer);

  let root: ReactDOM.Root | null = null;

  const closeAlert = () => {
    if (root) {
      root.unmount();
      document.body.removeChild(alertContainer);
    }
  };

  const AlertComponent = () => (
    <Alert type={type} message={message} onClose={closeAlert} />
  );
  
  if (!root) {
    root = ReactDOM.createRoot(alertContainer);
  }
  root.render(<AlertComponent />);
}

if (typeof window !== "undefined") {
  const originalAlert = window.alert;
  window.alert = (message: string) => {
    WindowAlert("info", message);
  };
}
