import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "./components/context/auth.jsx";
import { UserProvider } from "./components/context/userinfo.jsx";
import "@fontsource-variable/inter/index.css"
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <CookiesProvider>
        <AuthProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </AuthProvider>
      </CookiesProvider>
    </Provider>
  </StrictMode>
);
