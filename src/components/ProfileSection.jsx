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
    <div className="max-w-lg mb-10">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Profile
      </h2>

      <div className="flex items-center gap-4 mb-6">
        <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden flex items-center justify-center shrink-0">
          {photoUrl ? (
            <img src={photoUrl} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <span className="text-xl font-semibold text-gray-400">
              {user?.email?.[0]?.toUpperCase()}
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
            className="rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
          >
            {isUploadingPhoto ? "Uploading..." : "Change Photo"}
          </button>
          <p className="mt-1 text-xs text-gray-400">JPG, PNG, or WEBP. Max 5MB.</p>
        </div>
      </div>

      <form onSubmit={handleUsernameSave} className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Username
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isSavingUsername}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saved ? "Saved ✓" : "Save"}
          </button>
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default ProfileSection;