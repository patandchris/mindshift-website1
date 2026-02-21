import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye, EyeOff, Mail, Lock, ArrowRight, User } from 'lucide-react';
import { z } from 'zod';
import mindshiftLogo from '@/assets/mindshift-logo-new.png';

const signupSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Please enter a valid email address').max(255, 'Email must be less than 255 characters'),
  password: z.string().min(1, 'Password is required'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const WeekOneAccess = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/week-one-content');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/week-one-content');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const emailValidation = z.string().email('Please enter a valid email address').safeParse(email);
      if (!emailValidation.success) {
        setErrors({ email: emailValidation.error.errors[0].message });
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/week-one-access`,
      });

      if (error) throw error;

      toast({
        title: "Check your email",
        description: "We've sent you a password reset link.",
      });
      setIsForgotPassword(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      if (isLogin) {
        const validation = loginSchema.safeParse({ email, password });
        if (!validation.success) {
          const fieldErrors: Record<string, string> = {};
          validation.error.errors.forEach(err => {
            if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
          });
          setErrors(fieldErrors);
          return;
        }

        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "Redirecting to your Week 1 content...",
        });
      } else {
        const validation = signupSchema.safeParse({ name, email, password, confirmPassword });
        if (!validation.success) {
          const fieldErrors: Record<string, string> = {};
          validation.error.errors.forEach(err => {
            if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
          });
          setErrors(fieldErrors);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/week-one-content`,
            data: { full_name: name },
          },
        });

        if (error) throw error;

        // Create member record
        if (data.user) {
          const { error: memberError } = await supabase
            .from('week1_members')
            .insert({
              user_id: data.user.id,
              email: email,
              status: 'not_started',
            });

          if (memberError) {
            console.error('Error creating member record:', memberError);
          }
        }

        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      let message = error.message;
      if (error.message.includes('User already registered')) {
        message = 'An account with this email already exists. Please sign in instead.';
      }
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isForgotPassword) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header hideNavAndCta />
        
        <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <img src={mindshiftLogo} alt="MindShift System" className="h-16 mx-auto mb-6" />
              <h1 className="text-2xl font-bold mb-2 text-muted-foreground">Reset Your Password</h1>
              <p className="text-muted-foreground">
                Enter your email and we'll send you a reset link
              </p>
            </div>

            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-muted-foreground">Email</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="pl-10 bg-card border-border"
                  />
                </div>
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
              </div>

              <Button type="submit" variant="premium" size="lg" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="text-sm text-accent hover:underline"
              >
                Back to sign in
              </button>
            </div>
          </div>
        </main>

        <Footer minimal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header hideNavAndCta />
      
      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src={mindshiftLogo} alt="MindShift System" className="h-16 mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-2 text-muted-foreground">
              {isLogin ? 'Welcome Back' : 'Get Free Access to Week 1'}
            </h1>
            <p className="text-muted-foreground">
              {isLogin 
                ? 'Sign in to continue your journey' 
                : 'Create your account to start transforming your mindset'}
            </p>
          </div>

          <div className="card-premium">
            <form onSubmit={handleAuth} className="space-y-5">
              {!isLogin && (
                <div>
                  <Label htmlFor="name" className="text-muted-foreground">Name</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your name"
                      className="pl-10 bg-card border-border text-foreground"
                    />
                  </div>
                  {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                </div>
              )}

              <div>
                <Label htmlFor="email" className="text-muted-foreground">Email</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="pl-10 bg-card border-border text-foreground"
                  />
                </div>
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="password" className="text-muted-foreground">Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-card border-border text-foreground placeholder:text-muted-foreground/40 placeholder:font-light"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-muted-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
              </div>

              {!isLogin && (
                <div>
                  <Label htmlFor="confirmPassword" className="text-muted-foreground">Confirm Password</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="pl-10 pr-10 bg-card border-border text-foreground placeholder:text-muted-foreground/40 placeholder:font-light"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-muted-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              )}

              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(true)}
                    className="text-sm text-accent hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button type="submit" variant="premium" size="lg" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </>
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Get Free Access'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                }}
                className="text-sm text-muted-foreground hover:text-muted-foreground"
              >
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <span className="text-accent hover:underline">
                  {isLogin ? 'Sign up' : 'Sign in'}
                </span>
              </button>
            </div>
          </div>

          {!isLogin && (
            <p className="text-center text-sm text-muted-foreground mt-6">
              By signing up, you agree to receive updates about the MindShift System.
            </p>
          )}
        </div>
      </main>

      <Footer minimal />
    </div>
  );
};

export default WeekOneAccess;
