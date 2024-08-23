import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { NotificationProvider } from './NotificationProvider';
import "./index.css";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <NotificationProvider >
        <App />
      </NotificationProvider>
    </ConvexProvider>
  </StrictMode>
);
