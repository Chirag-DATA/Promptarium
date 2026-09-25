import { useState, useRef } from "react";
import { useAuth } from "../hooks/useAuth";

const ProfileSection = () => {
  const { user, updateProfile, uploadPhoto } = useAuth();
  const fileInputRef = useRef(null);

  const [username, setUsername] = useState(user?.username || "");
  const [isSavingUsername, setIsSavingUsername] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const photoUrl = user?.profile_image_url
    ? `${import.meta.env.VITE_API_BASE_URL}${user.profile_image_url}`
    : null;

  const handleUsernameSave = async (e) => {
    e.preventDefault();
    setError("");
    setIsSavingUsername(true);

    try {
      await updateProfile({ username: username.trim() });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSavingUsername(false);
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError("");
    setIsUploadingPhoto(true);

    try {
      await uploadPhoto(file);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploadingPhoto(false);
      e.target.value = "";
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111827] p-6 shadow-xs">
      <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 mb-4">
        Profile Settings
      </h2>

      <div className="flex items-center gap-4 mb-6">
        <div className="h-16 w-16 rounded-full ring-1 ring-slate-200 dark:ring-slate-700 bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center shrink-0">
          {photoUrl ? (
            <img src={photoUrl} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {(user?.email || "U")[0].toUpperCase()}
            </span>
          )}
        </div>

        <div>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            ref={fileInputRef}
            onChange={handlePhotoChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            disabled={isUploadingPhoto}
            className="rounded-full border border-slate-200 dark:border-slate-800 px-4 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            {isUploadingPhoto ? "Uploading..." : "Change Avatar"}
          </button>
          <p className="mt-1 text-[11px] font-medium text-slate-400">JPG, PNG, or WEBP up to 5MB.</p>
        </div>
      </div>

      <form onSubmit={handleUsernameSave} className="flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Username
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your public handle"
            className="flex-1 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F19] px-4 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
          <button
            type="submit"
            disabled={isSavingUsername}
            className="rounded-full bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors disabled:opacity-50"
          >
            {saved ? "Saved ✓" : "Save"}
          </button>
        </div>
        {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}
      </form>
    </div>
  );
};

export default ProfileSection;