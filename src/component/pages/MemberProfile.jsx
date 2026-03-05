import React, { useState } from "react";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { ProfileModal } from "../AdminProfile";   // same modal reuse
import EditProfileModal from "../AdminProfile";   // edit modal reuse

function MemberProfile() {

  const [modal, setModal] = useState(null);

  const [name, setName] = useState(localStorage.getItem("name") || "Member");
  const [email, setEmail] = useState(localStorage.getItem("email") || "member@gmail.com");
  const [avatar, setAvatar] = useState(null);

  const role = "Member";

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-0">

      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Member Profile
      </h1>

      {/* Profile Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border dark:border-slate-700 p-6 flex flex-col sm:flex-row items-center gap-6">

        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-800 to-indigo-600 flex items-center justify-center shadow-lg flex-shrink-0 overflow-hidden">

          {avatar ? (
            <img
              src={avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-white/80 text-5xl" />
          )}

        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">

          <p className="text-xl font-bold dark:text-white">
            {name}
          </p>

          <p className="text-sm text-indigo-500 font-medium capitalize">
            {role}
          </p>

          <p className="text-sm text-gray-400 mt-0.5">
            {email}
          </p>

        </div>

        {/* Buttons */}
        <div className="flex gap-2">

          <button
            onClick={() => setModal("view")}
            className="flex items-center gap-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
          >
            <FaUserCircle /> View Profile
          </button>

          <button
            onClick={() => setModal("edit")}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm"
          >
            <FaEdit /> Edit Profile
          </button>

        </div>
      </div>

      {/* View Modal */}
      {modal === "view" && (
        <ProfileModal onClose={() => setModal(null)} />
      )}

      {/* Edit Modal */}
      {modal === "edit" && (
        <EditProfileModal
          initialAvatar={avatar}
          onClose={() => setModal(null)}
          onSave={({ newAvatar, name: n, email: e }) => {

            if (newAvatar) setAvatar(newAvatar);
            if (n) setName(n);
            if (e) setEmail(e);

            setModal(null);
          }}
        />
      )}

    </div>
  );
}

export default MemberProfile;