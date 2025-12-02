import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";
import logoImage from "@/assets/logo.png";

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, initialize } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
    try {
      signUp(name.trim(), email.trim().toLowerCase(), password);
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Something went wrong while creating your account.");
    }
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

        <h2 className="font-heading text-2xl font-semibold mb-2">Sign up</h2>
        <p className="text-sm text-muted-foreground mb-6">
          This is a frontend-only MVP. Your profile is stored locally in your browser.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground" htmlFor="name">
              Full Name
            </label>
            <Input
              id="name"
              placeholder="e.g. Ada Lovelace"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-xs text-destructive mt-1">{error}</p>}

          <Button type="submit" variant="hero" size="lg" className="w-full mt-2">
            Create account
          </Button>
        </form>

        <p className="mt-4 text-xs text-muted-foreground text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>

        <p className="mt-6 text-[11px] text-muted-foreground text-center">
          For quick testing you can also use{" "}
          <span className="font-semibold text-foreground">test@example.com</span> /{" "}
          <span className="font-semibold text-foreground">123456</span>.
        </p>
      </div>
    </div>
  );
};

export default SignUp;


