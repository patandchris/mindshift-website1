import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center pt-24">
        <div className="container-premium">
          <div className="text-center max-w-2xl mx-auto">
            {/* 404 Display */}
            <div className="mb-8">
              <h1 className="text-8xl md:text-9xl font-black text-accent/20 mb-4">404</h1>
              <div className="divider-gold max-w-xs mx-auto mb-8" />
            </div>

            {/* Error Message */}
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Page Not <span className="text-accent">Found</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Homepage
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Button>
            </div>

            {/* Help Text */}
            <div className="mt-12 bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-4 text-center">Looking for something specific?</h3>
              <div className="flex flex-col sm:flex-row gap-4 text-sm justify-center items-center">
                <div>
                  <Link to="/podcast" className="text-accent hover:text-accent/80 transition-colors">
                    → Listen to Podcast
                  </Link>
                </div>
                <div>
                  <Link to="/#coaching" className="text-accent hover:text-accent/80 transition-colors">
                    → Learn About Coaching
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
