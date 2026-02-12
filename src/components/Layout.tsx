import { Link, useLocation, useNavigate } from "react-router-dom";
import { Database, BarChart3, Search, Shield, Compass, GitCompare, ShoppingCart } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserAuthButton } from "@/components/UserAuthButton";
import { useCart } from "@/hooks/useCart";
import { CartDrawer } from "@/components/CartDrawer";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const navItems = [
  { to: "/search", label: "Discover", icon: Search },
  { to: "/compare", label: "Compare", icon: GitCompare },
  { to: "/use-cases", label: "Use Cases", icon: Compass },
  { to: "/compliance", label: "Trust", icon: Shield },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-14 max-w-7xl mx-auto px-4">
          <button
            onClick={() => navigate(location.pathname)}
            className="flex items-center gap-2 focus:outline-none"
            aria-label="Data Nexus Logo"
          >
            <img src="/favicon.png" alt="DataNexus Logo" className="w-7 h-7 rounded-md" />
            <span className="font-bold text-foreground text-sm tracking-tight">
              Data Nexus<span className="text-primary"></span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <item.icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              title="Cart"
            >
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
                >
                  {itemCount}
                </Badge>
              )}
            </button>
            <ThemeToggle />
            <UserAuthButton />
          </nav>

          {/* Mobile nav */}
          <nav className="flex md:hidden items-center gap-0.5">
            {navItems.slice(0, 4).map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`p-2 rounded-md transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                </Link>
              );
            })}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              title="Cart"
            >
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[9px]"
                >
                  {itemCount}
                </Badge>
              )}
            </button>
            <ThemeToggle />
            <UserAuthButton />
          </nav>
        </div>
      </header>

      <main>{children}</main>
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}
