import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, AlertCircle, Loader2, Compass, Sun, Moon, MailCheck } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { apiClient } from "../services/apiClient";

const Signup = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [step, setStep] = useState("REGISTER"); // "REGISTER" | "VERIFY_OTP"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendStatus, setResendStatus] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsSubmitting(true);
    try {
      await apiClient.post("/auth/signup", { email, password });
      setStep("VERIFY_OTP");
    } catch (err) {
      setError(err.message || "Failed to register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const data = await apiClient.post("/auth/verify-otp", { email, otp });
      localStorage.setItem("promptarium_auth_token", data.access_token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message || "Invalid or expired code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setResendStatus("");
    try {
      await apiClient.post("/auth/resend-otp", { email });
      setResendStatus("New code sent!");
      setTimeout(() => setResendStatus(""), 4000);
    } catch (err) {
      setError(err.message || "Could not resend OTP.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <header className="w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md px-6 lg:px-12 h-16 flex items-center justify-between z-20">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="text-xl font-black tracking-tight text-blue-500 uppercase">
              PROMPT<span className="text-white">ARIUM</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Compass size={14} /> Explore Feed
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <Link
            to="/login"
            className="px-4 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 text-white text-xs font-bold transition-colors"
          >
            Sign In
          </Link>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="relative lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-16 bg-slate-950 overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800/80">
          <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-lg">
            <span className="text-4xl sm:text-5xl font-black text-blue-500 tracking-tight uppercase">
              PROMPT<span className="text-white">ARIUM</span>
            </span>
            <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {step === "REGISTER" ? "Every prompt, ready when you are." : "Verify your identity."}
            </h2>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              {step === "REGISTER"
                ? "Create your account to organize your prompt collection, test with Gemini AI, and sync across devices."
                : `We have sent a 6-digit confirmation code to ${email}. Check your inbox or spam folder.`}
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-white dark:bg-[#0B0F19]">
          <div className="w-full max-w-md">
            {error && (
              <div className="mb-6 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 p-3.5 flex items-start gap-2.5 text-rose-700 dark:text-rose-300 text-xs">
                <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            {step === "REGISTER" ? (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                    Create Account
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
                    Enter your email to receive an activation code.
                  </p>
                </div>

                <form onSubmit={handleRegister} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      required
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#111827] px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Password (min 8 characters)
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={8}
                        className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#111827] px-4 pr-11 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-sm py-3.5 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : "Send Confirmation Code"}
                  </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 text-center">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 dark:text-blue-400 font-bold hover:underline ml-1">
                      Sign in
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="mb-8">
                  <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mb-4">
                    <MailCheck size={24} />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                    Enter Verification Code
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
                    Enter the 6-digit code sent to <span className="font-semibold text-slate-700 dark:text-slate-200">{email}</span>.
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      6-Digit Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="123456"
                      required
                      className="w-full text-center tracking-[8px] font-mono text-xl font-bold rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#111827] px-4 py-3 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || otp.length !== 6}
                    className="mt-2 w-full rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-sm py-3.5 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : "Verify & Enter Workspace"}
                  </button>
                </form>

                <div className="mt-6 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                  >
                    Resend code
                  </button>
                  {resendStatus && <span className="text-emerald-600 dark:text-emerald-400">{resendStatus}</span>}
                  <button
                    type="button"
                    onClick={() => setStep("REGISTER")}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    Change email
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;