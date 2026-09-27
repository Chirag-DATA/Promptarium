import { useState, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { Camera, Check, Loader2, User as UserIcon } from "lucide-react";

const ProfileSection = () => {
  const { user, updateProfile, uploadPhoto } = useAuth();

  const [username, setUsername] = useState(user?.username || "");
  const [isUpdatingUsername, setIsUpdatingUsername] = useState(false);
  const [usernameSuccess, setUsernameSuccess] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const fileInputRef = useRef(null);

  // Support both full Cloudinary HTTPS URLs and local server paths
  const avatarUrl = user?.profile_image_url
    ? user.profile_image_url.startsWith("http")
      ? user.profile_image_url
      : `${import.meta.env.VITE_API_BASE_URL}${user.profile_image_url}`
    : null;

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || username.trim() === user?.username) return;

    setIsUpdatingUsername(true);
    setUsernameError("");
    setUsernameSuccess(false);

    try {
      await updateProfile({ username: username.trim() });
      setUsernameSuccess(true);
      setTimeout(() => setUsernameSuccess(false), 2500);
    } catch (err) {
      setUsernameError(err.message || "Failed to update username.");
    } finally {
      setIsUpdatingUsername(false);
    }
  };

  const handlePhotoSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/^image\/(jpeg|png|webp|jpg)$/)) {
      setPhotoError("Please select a valid image (JPG, PNG, or WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setPhotoError("Image size must be smaller than 5MB.");
      return;
    }

    setIsUploadingPhoto(true);
    setPhotoError("");

    try {
      await uploadPhoto(file);
    } catch (err) {
      setPhotoError(err.message || "Failed to upload profile photo.");
    } finally {
      setIsUploadingPhoto(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111827] p-6 shadow-xs">
      <div className="flex items-center gap-2 mb-4">
        <UserIcon size={18} className="text-blue-600 dark:text-blue-400" />
        <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
          Profile Settings
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-800/60">
        {/* Avatar Display & Upload Trigger */}
        <div className="relative group">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={user?.username || user?.email}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <span className="text-xl font-bold uppercase text-slate-500 dark:text-slate-400">
                {user?.username?.charAt(0) || user?.email?.charAt(0) || "U"}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploadingPhoto}
            aria-label="Upload profile photo"
            className="absolute -bottom-1.5 -right-1.5 p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-transform active:scale-95 disabled:opacity-60"
          >
            {isUploadingPhoto ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Camera size={13} />
            )}
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handlePhotoSelect}
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
          />
        </div>

        {/* User Identity Details */}
        <div className="flex-1">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            {user?.username || "Unnamed Creator"}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {user?.email}
          </p>
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/50">
            {user?.is_verified ? "Verified Account" : "Unverified"}
          </span>

          {photoError && (
            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 mt-2">
              {photoError}
            </p>
          )}
        </div>
      </div>

      {/* Username Edit Form */}
      <form onSubmit={handleUsernameSubmit} className="mt-5 flex flex-col gap-3">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Display Username
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. prompt_wizard"
            className="flex-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F19] px-4 py-2.5 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
          <button
            type="submit"
            disabled={isUpdatingUsername || !username.trim() || username.trim() === user?.username}
            className="rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors flex items-center gap-1.5"
          >
            {isUpdatingUsername ? (
              <Loader2 size={13} className="animate-spin" />
            ) : usernameSuccess ? (
              <Check size={13} />
            ) : null}
            {usernameSuccess ? "Updated" : "Save"}
          </button>
        </div>

        {usernameError && (
          <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
            {usernameError}
          </p>
        )}
      </form>
    </div>
  );
};

export default ProfileSection;