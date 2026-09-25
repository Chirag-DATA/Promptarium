import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApiKey } from "../hooks/useApiKey";
import { useAuth } from "../hooks/useAuth";
import ProfileSection from "../components/ProfileSection";
import { Key, AlertTriangle, Loader2, MailWarning } from "lucide-react";

const Settings = () => {
  const { apiKey, setApiKey } = useApiKey();
  const { user, requestDeleteOtp, confirmDeleteAccount } = useAuth();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  // Account deletion states
  const [deleteStep, setDeleteStep] = useState("IDLE"); // "IDLE" | "OTP_SENT"
  const [deleteOtp, setDeleteOtp] = useState("");
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleteStatus, setDeleteStatus] = useState("");

  useEffect(() => {
    setInputValue(apiKey);
  }, [apiKey]);

  const handleSave = (e) => {
    e.preventDefault();
    setApiKey(inputValue.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    setApiKey("");
    setInputValue("");
  };

  const handleRequestOtp = async () => {
    setIsRequestingOtp(true);
    setDeleteError("");
    setDeleteStatus("");

    try {
      await requestDeleteOtp();
      setDeleteStep("OTP_SENT");
      setDeleteStatus(`Verification code sent to ${user?.email}`);
    } catch (err) {
      setDeleteError(err.message || "Failed to send deletion OTP. Please try again.");
    } finally {
      setIsRequestingOtp(false);
    }
  };

  const handleConfirmDelete = async (e) => {
    e.preventDefault();
    if (!deleteOtp.trim() || deleteOtp.length !== 6) {
      setDeleteError("Please enter a valid 6-digit verification code.");
      return;
    }

    setIsDeleting(true);
    setDeleteError("");

    try {
      await confirmDeleteAccount(deleteOtp);
      navigate("/signup");
    } catch (err) {
      setDeleteError(err.message || "Failed to delete account. The code may be invalid or expired.");
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteStep("IDLE");
    setDeleteOtp("");
    setDeleteError("");
    setDeleteStatus("");
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Settings
        </h1>
        <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
          Profile details, browser-scoped Gemini API settings, and account management.
        </p>
      </div>

      <ProfileSection />

      {/* API Key Box */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111827] p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <Key size={18} className="text-blue-600 dark:text-blue-400" />
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
            Google Gemini API Key
          </h2>
        </div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
          Add your personal Gemini key to enable one-click prompt enhancements (rewrite, optimize, summarize). Stored strictly on your local browser.
        </p>

        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <input
            type="password"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F19] px-4 py-2.5 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />

          <div className="flex items-center gap-3 mt-1">
            <button
              type="submit"
              className="rounded-full bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors"
            >
              {saved ? "Saved ✓" : "Save Key"}
            </button>
            {apiKey && (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs font-semibold text-rose-600 hover:underline"
              >
                Remove Key
              </button>
            )}
          </div>
        </form>

        <p className="mt-4 text-[11px] font-medium text-slate-500 dark:text-slate-400">
          Need a key? Grab one for free at{" "}
          <a
            href="https://aistudio.google.com/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            Google AI Studio
          </a>.
        </p>
      </div>

      {/* Danger Zone: Account Deletion via Email OTP */}
      <div className="rounded-3xl border border-rose-200 dark:border-rose-950/60 bg-rose-50/40 dark:bg-rose-950/20 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-2 text-rose-600 dark:text-rose-400">
          <AlertTriangle size={18} />
          <h2 className="text-sm font-extrabold">Danger Zone</h2>
        </div>
        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          Permanently delete your account, saved prompt templates, and personal vault data. To prevent accidental loss, an OTP verification code will be sent to your registered email address.
        </p>

        {deleteError && (
          <div className="mb-4 rounded-2xl bg-rose-100 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-900/50 p-3 text-xs font-semibold text-rose-700 dark:text-rose-300">
            {deleteError}
          </div>
        )}

        {deleteStatus && (
          <div className="mb-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 p-3 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            {deleteStatus}
          </div>
        )}

        {deleteStep === "IDLE" ? (
          <button
            type="button"
            onClick={handleRequestOtp}
            disabled={isRequestingOtp}
            className="rounded-full bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white font-bold text-xs px-4 py-2 transition-colors shadow-xs flex items-center gap-2"
          >
            {isRequestingOtp ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                <span>Sending Code...</span>
              </>
            ) : (
              "Delete Account"
            )}
          </button>
        ) : (
          <form
            onSubmit={handleConfirmDelete}
            className="flex flex-col gap-3 rounded-2xl bg-white dark:bg-[#111827] border border-rose-200 dark:border-rose-900/50 p-4"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <MailWarning size={16} className="text-rose-600" />
              <span>Enter the 6-digit code sent to {user?.email}:</span>
            </div>

            <input
              type="text"
              maxLength={6}
              value={deleteOtp}
              onChange={(e) => setDeleteOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="123456"
              required
              className="w-full text-center tracking-[6px] font-mono text-lg font-bold rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F19] px-3.5 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
            />

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={isDeleting || deleteOtp.length !== 6}
                  className="rounded-full bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs px-4 py-2 transition-colors flex items-center gap-1.5"
                >
                  {isDeleting && <Loader2 size={13} className="animate-spin" />}
                  Confirm Permanent Deletion
                </button>
                <button
                  type="button"
                  onClick={handleCancelDelete}
                  className="rounded-full border border-slate-200 dark:border-slate-800 text-xs font-semibold px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
              </div>

              <button
                type="button"
                onClick={handleRequestOtp}
                disabled={isRequestingOtp}
                className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
              >
                Resend code
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Settings;