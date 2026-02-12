import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "@/components/RequireAuth";
import { ThemeProvider } from "next-themes";
import { Layout } from "@/components/Layout";
import { LoginModalProvider } from "@/hooks/useLoginModal";
import { LoginModal } from "@/components/LoginModal";
import { CartProvider } from "@/hooks/useCart";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import ProductDetail from "./pages/ProductDetail";
import Compare from "./pages/Compare";
import UseCases from "./pages/UseCases";
import Compliance from "./pages/Compliance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <LoginModalProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <LoginModal />
            <BrowserRouter>
            <Routes>
              {/* Landing page without Layout */}
              <Route path="/" element={<Landing />} />
              
              {/* All other pages with Layout (protected) */}
              <Route path="/home" element={<RequireAuth><Layout><Index /></Layout></RequireAuth>} />
              <Route path="/search" element={<RequireAuth><Layout><SearchResults /></Layout></RequireAuth>} />
              <Route path="/dataset/:id" element={<RequireAuth><Layout><ProductDetail /></Layout></RequireAuth>} />
              <Route path="/compare" element={<RequireAuth><Layout><Compare /></Layout></RequireAuth>} />
              <Route path="/use-cases" element={<RequireAuth><Layout><UseCases /></Layout></RequireAuth>} />
              <Route path="/compliance" element={<RequireAuth><Layout><Compliance /></Layout></RequireAuth>} />
              <Route path="*" element={<RequireAuth><Layout><NotFound /></Layout></RequireAuth>} />
            </Routes>
          </BrowserRouter>
          </CartProvider>
        </LoginModalProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
