import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle, FaSignOutAlt, FaTimes, FaCamera,
  FaEdit, FaEnvelope, FaShieldAlt, FaPhone,
  FaLock, FaEye, FaEyeSlash, FaCheckCircle,
} from "react-icons/fa";

// ─────────────────────────────────────────────────────────────────
//  ProfileModal  — the popup shown from navbar avatar click
// ─────────────────────────────────────────────────────────────────
export function ProfileModal({ onClose }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [avatar, setAvatar] = useState(null);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const name  = localStorage.getItem("name")  || "Admin";
  const email = localStorage.getItem("email") || "admin@hrms.com";
  const role  = localStorage.getItem("role")  || "Admin";

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // ── Logout confirm layer ──────────────────────────────────────
  if (logoutConfirm) {
    return (
      <ModalShell onClose={onClose}>
        <div className="text-center px-2 py-4">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaSignOutAlt className="text-red-500 text-xl" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Logout?</h2>
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to logout?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setLogoutConfirm(false)}
              className="flex-1 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all shadow-md"
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </ModalShell>
    );
  }

  // ── Edit profile layer ────────────────────────────────────────
  if (editOpen) {
    return (
      <EditProfileModal
        initialAvatar={avatar}
        onClose={() => setEditOpen(false)}
        onSave={({ newAvatar }) => {
          if (newAvatar) setAvatar(newAvatar);
          setEditOpen(false);
        }}
      />
    );
  }

  // ── Main profile popup ────────────────────────────────────────
  return (
    <ModalShell onClose={onClose}>
      {/* Avatar */}
      <div className="flex flex-col items-center mb-5">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleAvatarChange}
        />
        <div
          className="relative cursor-pointer group mb-3"
          onClick={() => fileInputRef.current.click()}
        >
          {avatar ? (
            <img
              src={avatar}
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-800 to-indigo-600 flex items-center justify-center border-4 border-white shadow-lg">
              <FaUserCircle className="text-white/80 text-6xl" />
            </div>
          )}
          {/* camera hover overlay */}
          <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <FaCamera className="text-white text-lg" />
          </div>
          {/* small camera badge */}
          <button
            onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }}
            className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center border-2 border-white shadow transition-colors"
          >
            <FaCamera className="text-white" style={{ fontSize: 10 }} />
          </button>
        </div>

        {/* Name & Role */}
        <h2 className="text-xl font-bold text-indigo-600">{name}</h2>
        <p className="text-sm text-gray-500">{role === "admin" ? "Administrator" : role}</p>
      </div>

      {/* Info rows */}
      <div className="space-y-4 mb-6 text-sm">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Name</p>
          <p className="font-medium text-gray-800">{name}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Email</p>
          <p className="font-medium text-gray-800">{email}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Role</p>
          <p className="font-medium text-gray-800 capitalize">{role}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setLogoutConfirm(true)}
          className="flex-1 flex items-center justify-center gap-2 border border-red-400 text-red-500 hover:bg-red-50 py-2.5 rounded-lg text-sm font-medium transition-all"
        >
          <FaSignOutAlt /> Logout
        </button>
        <button
          onClick={onClose}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg text-sm font-medium transition-all shadow-md"
        >
          Close
        </button>
      </div>
    </ModalShell>
  );
}

// ─────────────────────────────────────────────────────────────────
//  Reusable modal shell with backdrop + white card
// ─────────────────────────────────────────────────────────────────
function ModalShell({ onClose, children }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* X close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <FaTimes size={16} />
        </button>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  Edit Profile Modal (opened from inside ProfileModal)
// ─────────────────────────────────────────────────────────────────
function EditProfileModal({ initialAvatar, onClose, onSave }) {
  const editFileRef = useRef(null);
  const [editAvatar, setEditAvatar] = useState(initialAvatar);
  const [fullName, setFullName] = useState(localStorage.getItem("name") || "Admin");
  const [email, setEmail] = useState(localStorage.getItem("email") || "admin@hrms.com");
  const [phone, setPhone] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    localStorage.setItem("name", fullName);
    localStorage.setItem("email", email);
    setSuccess(true);
    setTimeout(() => {
      onSave({ newAvatar: editAvatar });
    }, 1000);
  };

  return (
    <ModalShell onClose={onClose}>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FaEdit className="text-indigo-500" /> Edit Profile
      </h2>

      <div className="overflow-y-auto max-h-[70vh] space-y-4 pr-1">
        {/* Avatar in edit modal */}
        <div className="flex flex-col items-center gap-1 mb-2">
          <input
            type="file" accept="image/*" className="hidden"
            ref={editFileRef}
            onChange={(e) => {
              const f = e.target.files[0];
              if (f) setEditAvatar(URL.createObjectURL(f));
            }}
          />
          <div
            className="relative cursor-pointer group"
            onClick={() => editFileRef.current.click()}
          >
            {editAvatar ? (
              <img src={editAvatar} alt="avatar" className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-800 to-indigo-600 flex items-center justify-center border-4 border-white shadow-lg">
                <FaUserCircle className="text-white/80 text-5xl" />
              </div>
            )}
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <FaCamera className="text-white text-base" />
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); editFileRef.current.click(); }}
              className="absolute bottom-0 right-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white shadow"
            >
              <FaCamera className="text-white" style={{ fontSize: 9 }} />
            </button>
          </div>
          <p className="text-xs text-gray-400">Click to change photo</p>
        </div>

        {/* Fields */}
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase">Full Name</label>
          <input
            value={fullName} onChange={(e) => setFullName(e.target.value)}
            className="w-full border p-2.5 rounded-lg mt-1 text-sm outline-none focus:border-indigo-500"
            placeholder="Full name"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase flex items-center gap-1"><FaEnvelope size={9} /> Email</label>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2.5 rounded-lg mt-1 text-sm outline-none focus:border-indigo-500"
            placeholder="Email address"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase flex items-center gap-1"><FaPhone size={9} /> Phone</label>
          <input
            type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-2.5 rounded-lg mt-1 text-sm outline-none focus:border-indigo-500"
            placeholder="Phone number"
          />
        </div>

        {/* Password */}
        <div className="border-t pt-4">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-3 flex items-center gap-1">
            <FaLock size={9} /> Change Password <span className="font-normal normal-case">(optional)</span>
          </p>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400">Current Password</label>
              <div className="relative mt-1">
                <input
                  type={showOld ? "text" : "password"} value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                  className="w-full border p-2.5 rounded-lg text-sm outline-none focus:border-indigo-500 pr-10"
                  placeholder="Current password"
                />
                <button onClick={() => setShowOld(!showOld)} className="absolute right-3 top-3 text-gray-400">
                  {showOld ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400">New Password</label>
              <div className="relative mt-1">
                <input
                  type={showNew ? "text" : "password"} value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full border p-2.5 rounded-lg text-sm outline-none focus:border-indigo-500 pr-10"
                  placeholder="New password"
                />
                <button onClick={() => setShowNew(!showNew)} className="absolute right-3 top-3 text-gray-400">
                  {showNew ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {success && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-sm">
            <FaCheckCircle /> Saved successfully!
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-5">
        <button onClick={onClose} className="flex-1 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 transition-all">
          Cancel
        </button>
        <button onClick={handleSave} className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-all shadow-md">
          Save Changes
        </button>
      </div>
    </ModalShell>
  );
}

// ─────────────────────────────────────────────────────────────────
//  AdminProfile page  (route: /admin/profile)
//  — shows the profile card + a button to open the popup modal
// ─────────────────────────────────────────────────────────────────
export default function AdminProfile() {
  const [modalOpen, setModalOpen] = useState(false);

  const name  = localStorage.getItem("name")  || "Admin";
  const email = localStorage.getItem("email") || "admin@hrms.com";
  const role  = localStorage.getItem("role")  || "Admin";

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-0">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Admin Profile</h1>

      {/* Simple card with "View Profile" button */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border dark:border-slate-700 p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-800 to-indigo-600 flex items-center justify-center shadow-lg flex-shrink-0">
          <FaUserCircle className="text-white/80 text-5xl" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="text-xl font-bold dark:text-white">{name}</p>
          <p className="text-sm text-indigo-500 font-medium">{role}</p>
          <p className="text-sm text-gray-400 mt-0.5">{email}</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm"
        >
          <FaUserCircle /> View Profile
        </button>
      </div>

      {/* Profile Popup Modal */}
      {modalOpen && <ProfileModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}