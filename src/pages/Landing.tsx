import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/welcome@300x-100.jpg";
import logoImage from "@/assets/logo.png";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoImage} alt="Logo" className="h-50 w-auto" />
          </div>
          <div className="flex items-center gap-3">
            <Link to="/signin">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="hero" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center">
        <div className="container mx-auto px-4 py-10 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Lagos · Rider matching and tracking
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Match with{" "}
              <span className="text-gradient">nearby riders</span> in seconds.
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl">
              Sign up, set your pickup and drop-off locations, and we&apos;ll
              recommend the closest riders with live tracking simulation on a
              beautiful map-like view.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/signup">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  Create free account
                </Button>
              </Link>
              <Link to="/signin">
                <Button variant="hero-outline" size="lg" className="w-full sm:w-auto">
                  I already have an account
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground pt-4">
              <div>
                <p className="font-semibold text-foreground text-sm">Secure sign in</p>
                <p>Email and password stored locally in your browser.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Nearest riders</p>
                <p>Sorted by distance with ratings and ETA.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Live tracking</p>
                <p>See your rider move on the map in real time.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border hero-gradient-subtle">
              <img
                src={heroImage}
                alt="Mobile map preview"
                className="w-full h-[600px] object-cover opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm rounded-2xl p-3 border border-border flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Quick demo
                  </p>
                  <p className="font-semibold text-sm text-foreground">
                    Use test account: test@example.com / 123456
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;


