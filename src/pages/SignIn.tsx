import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";
import logoImage from "@/assets/logo.png";

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn, initialize } = useAuthStore();
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    const user = signIn(email.trim().toLowerCase(), password);
    if (!user) {
      setError("Invalid credentials. Try the test account: test@example.com / 123456");
      return;
    }
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md mx-4 rounded-3xl border border-border bg-card card-elevated p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <img src={logoImage} alt="Logo" className="h-10 w-auto" />
          <Link to="/" className="text-xs text-muted-foreground hover:text-primary">
            Back home
          </Link>
        </div>

        <h2 className="font-heading text-2xl font-semibold mb-2">Sign in</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Use the seeded test account or any account you created on this browser.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-xs text-destructive mt-1">{error}</p>}

          <Button type="submit" variant="hero" size="lg" className="w-full mt-2">
            Continue
          </Button>
        </form>

        <p className="mt-4 text-xs text-muted-foreground text-center">
          New here?{" "}
          <Link to="/signup" className="text-primary font-medium hover:underline">
            Create an account
          </Link>
        </p>

        <p className="mt-6 text-[11px] text-muted-foreground text-center">
          Example credentials:{" "}
          <span className="font-semibold text-foreground">test@example.com</span> /{" "}
          <span className="font-semibold text-foreground">123456</span>.
        </p>
      </div>
    </div>
  );
};

export default SignIn;


