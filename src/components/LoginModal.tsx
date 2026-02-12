import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useLoginModal } from "@/hooks/useLoginModal";
import { useState } from "react";
import { Mail, Loader2, AlertCircle } from "lucide-react";
import { signInWithEmail, signInWithGoogle, signUpWithEmail } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function LoginModal() {
  const { isOpen, closeLoginModal, redirectTo } = useLoginModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const [isRegister, setIsRegister] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmail(email, password);
      toast({
        title: "Success!",
        description: `Welcome back, ${userCredential.user.email}!`,
      });
      closeLoginModal();
      // Optional: Redirect to the specified path
      if (redirectTo && redirectTo !== "/") {
        window.location.href = redirectTo;
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: err.message || "Please check your credentials and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signUpWithEmail(email, password);
      toast({
        title: "Account created",
        description: `Welcome, ${userCredential.user.email}!`,
      });
      closeLoginModal();
      // Redirect if provided
      if (redirectTo && redirectTo !== "/") {
        window.location.href = redirectTo;
      }
    } catch (err: any) {
      setError(err.message || "Failed to create account.");
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: err.message || "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithGoogle();

      toast({
        title: "Success!",
        description: `Welcome, ${userCredential.user.displayName || userCredential.user.email}!`,
      });
      closeLoginModal();
      // Optional: Redirect to the specified path
      if (redirectTo && redirectTo !== "/") {
        window.location.href = redirectTo;
      }
    } catch (err: any) {
      setError(err.message || `Failed to sign in with google.`);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: err.message || `Failed to sign in with google. Please try again.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeLoginModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {isRegister ? "Create Account" : "Welcome Back"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isRegister
              ? "Create an account to access your data discovery dashboard"
              : "Sign in to access your data discovery dashboard"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Social Login Buttons */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleSocialLogin}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Mail className="mr-2 h-4 w-4" />
              )}
              Continue with Google
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email Form (login or signup) */}
          <form onSubmit={isRegister ? handleEmailSignup : handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isRegister ? "Creating account..." : "Signing in..."}
                </>
              ) : (
                isRegister ? "Create Account" : "Sign In"
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <button
                  className="text-primary hover:underline"
                  onClick={() => setIsRegister(false)}
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  className="text-primary hover:underline"
                  onClick={() => setIsRegister(true)}
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
