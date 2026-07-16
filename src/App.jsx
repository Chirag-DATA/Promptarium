import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { PromptsProvider } from "./context/PromptsContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PromptsProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </PromptsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;