
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const routes = [
    { name: "Home", path: "/" },
    { name: "Onboarding", path: "/onboarding" },
    { name: "Bank Analysis", path: "/bank-analysis" },
    { name: "Performance", path: "/performance-analysis" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-finance-gray-light sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="font-bold text-2xl text-finance-blue">
            LeadLens<span className="text-finance-blue-dark">Insights</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={cn(
                "font-medium transition-colors hover:text-finance-blue",
                location.pathname === route.path
                  ? "text-finance-blue"
                  : "text-gray-600"
              )}
            >
              {route.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 py-3 shadow-lg absolute w-full">
          <div className="flex flex-col space-y-3">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  "py-2 px-3 rounded-md flex justify-between items-center",
                  location.pathname === route.path
                    ? "bg-finance-blue-light text-finance-blue font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{route.name}</span>
                {location.pathname === route.path && (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
