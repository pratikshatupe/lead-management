import { useState } from "react";
import {
  FaBuilding,
  FaUser,
  FaTag,
  FaLanguage,
  FaShieldAlt,
  FaDollarSign,
  FaCubes,
  FaHdd,
  FaEnvelope,
  FaDatabase,
  FaSyncAlt,
  FaCamera,
} from "react-icons/fa";

/* Pages */
import ComppanySettings from "./settingsPannel/ComppanySettings";
import Currencies from "./settingsPannel/Currencies";
import DatabaseBackup from "./settingsPannel/DatabaseBackup";
import EmailSettings from "./settingsPannel/EmailSettings";
import LeadStatus from "./settingsPannel/LeadStatus";
import Modules from "./settingsPannel/Modules";
import RolePermission from "./settingsPannel/RolePermission";
import StorageSettings from "./settingsPannel/StorageSettings";
import Translations from "./settingsPannel/Translations";
import UpdateApp from "./settingsPannel/UpdateApp";

const menuItems = [
  { key: "company", label: "Company Settings", icon: <FaBuilding /> },
  { key: "profile", label: "Profile", icon: <FaUser /> },
  { key: "leadstatus", label: "Lead Status", icon: <FaTag /> },
  { key: "translations", label: "Translations", icon: <FaLanguage /> },
  { key: "roles", label: "Role & Permissions", icon: <FaShieldAlt /> },
  { key: "currencies", label: "Currencies", icon: <FaDollarSign /> },
  { key: "modules", label: "Modules", icon: <FaCubes /> },
  { key: "storage", label: "Storage Settings", icon: <FaHdd /> },
  { key: "email", label: "Email Settings", icon: <FaEnvelope /> },
  { key: "database", label: "Database Backup", icon: <FaDatabase /> },
  { key: "update", label: "Update App", icon: <FaSyncAlt /> },
];

function ProfilePanel() {
  const [form, setForm] = useState({
    name: "Admin",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
          <p className="text-sm text-gray-400">
            Dashboard - Settings - <span className="text-gray-600">Profile</span>
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          <FaUser className="text-xs" />
          Update
        </button>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow border space-y-5">

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Profile Image</label>

          <label className="cursor-pointer inline-block mt-2">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImage}
            />

            {image ? (
              <img
                src={image}
                alt="profile"
                className="w-24 h-24 rounded-lg object-cover border"
              />
            ) : (
              <div className="w-24 h-24 border-2 border-dashed flex items-center justify-center rounded-lg text-gray-400 hover:border-blue-500">
                <FaCamera />
              </div>
            )}
          </label>
        </div>

        <div>
          <label className="text-sm font-medium">Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Update
        </button>

      </div>
    </div>
  );
}

export default function AdminSettings() {

  const [active, setActive] = useState("profile");

  const renderPanel = () => {
    switch (active) {
      case "profile":
        return <ProfilePanel />;
      case "company":
        return <ComppanySettings />;
      case "leadstatus":
        return <LeadStatus />;
      case "translations":
        return <Translations />;
      case "roles":
        return <RolePermission />;
      case "currencies":
        return <Currencies />;
      case "modules":
        return <Modules />;
      case "storage":
        return <StorageSettings />;
      case "email":
        return <EmailSettings />;
      case "database":
        return <DatabaseBackup />;
      case "update":
        return <UpdateApp />;
      default:
        return <ProfilePanel />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm">

        <div className="px-5 py-4 font-bold text-lg">
          Admin Settings
        </div>

        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActive(item.key)}
            className={`flex items-center gap-3 w-full px-5 py-3 text-left transition
            ${
              active === item.key
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-blue-50"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}

      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {renderPanel()}
      </div>

    </div>
  );
}