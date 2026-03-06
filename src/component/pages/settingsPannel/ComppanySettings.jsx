import React, { useState } from 'react';
import { FaTag, FaPlus, FaCamera } from 'react-icons/fa';

// कॉमन कॉम्पोनंट: लोगोज अपलोड करण्यासाठी
const LogoUploadField = ({ label, id }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <label htmlFor={id} className="cursor-pointer block">
        <input type="file" id={id} accept="image/*" className="hidden" onChange={handleImageChange} />
        {image ? (
          <img src={image} alt={label} className="w-full h-32 rounded-lg object-contain border border-gray-200" />
        ) : (
          <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-400 transition bg-white">
            <FaCamera className="text-3xl mb-1.5" />
            <span className="text-sm font-medium">Upload</span>
          </div>
        )}
      </label>
    </div>
  );
};

// कॉमन कॉम्पोनंट: सिलेक्ट फील्ड + बटन
const SelectWithAddBtn = ({ label, children, required, icon, value, ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {required && <span className="text-red-500">* </span>}
        {label}
      </label>
      <div className="relative">
        <select
          {...props}
          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none bg-white"
        >
          {children}
        </select>
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
          {icon}
        </span>
      </div>
    </div>
  );
};

// कॉमन कॉम्पोनंट: इनपुट फील्ड
const InputField = ({ label, required, value, ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {required && <span className="text-red-500">* </span>}
        {label}
      </label>
      <input
        {...props}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
      />
    </div>
  );
};

// कॉमन कॉम्पोनंट: टॉगल स्विच
const ToggleSwitch = ({ label, required, value, ...props }) => {
  return (
    <div className="flex items-center justify-between">
      <label className="block text-sm font-medium text-gray-700">
        {required && <span className="text-red-500">* </span>}
        {label}
      </label>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" {...props} />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
};

// मुख्य कंपोनेंट
export default function ComppanySettings() {
  const [primaryColor, setPrimaryColor] = useState('#007BFF');

  return (
    <div>
      {/* हेडर सेक्शन */}
      <div className="flex justify-between items-center mb-1">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Company Settings</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Dashboard - Settings - <span className="text-gray-600">Company Settings</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition">
            <FaTag className="text-xs" /> Update
          </button>
          <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium transition">
            <FaPlus className="text-xs" /> Add Menu Settings
          </button>
        </div>
      </div>

      {/* मुख्य फॉर्म सेक्शन */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
        
        {/* बेसीक कंपनी इन्फो */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          <InputField label="Company Name" required defaultValue="Lead Pro" />
          <InputField label="Company Short Name" required defaultValue="LeadPro" />
          <InputField label="Company Email" required defaultValue="company@example.com" />
          <InputField label="Company Phone" defaultValue="+16785861991" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Address</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white resize-none"
            placeholder="Please Enter Address"
            rows={4}
            defaultValue="7 street, city, state, 762782"
          />
        </div>

        {/* थीम आणि कलर्स */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          <SelectWithAddBtn label="Left Sidebar Theme" icon={<FaTag />}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </SelectWithAddBtn>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
            <input 
              type="color" 
              value={primaryColor} 
              onChange={(e) => setPrimaryColor(e.target.value)} 
              className="w-full h-11 border border-gray-300 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white cursor-pointer"
            />
          </div>
        </div>

        {/* लोकूज अपलोड */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <LogoUploadField label="Dark Logo" id="darkLogoUpload" />
          <LogoUploadField label="Light Logo" id="lightLogoUpload" />
          <LogoUploadField label="Small Dark Logo" id="smallDarkLogoUpload" />
          <LogoUploadField label="Small Light Logo" id="smallLightLogoUpload" />
        </div>

        <hr className="border-gray-100" />

        {/* करन्सी, लँग्वेज, लेआऊट */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          <SelectWithAddBtn label="Currency" required icon={<FaTag />}>
            <option>Dollar ($)</option>
            <option>Indian Rupee (₹)</option>
          </SelectWithAddBtn>
          <SelectWithAddBtn label="Language" required icon={<FaTag />}>
            <option>English</option>
            <option>Hindi</option>
          </SelectWithAddBtn>
          <SelectWithAddBtn label="Layout" required icon={<FaTag />}>
            <option>LTR</option>
            <option>RTL</option>
          </SelectWithAddBtn>
          <SelectWithAddBtn label="Add Menu Placement" required icon={<FaTag />}>
            <option>Top & Bottom</option>
            <option>Left Sidebar</option>
          </SelectWithAddBtn>
        </div>

        {/* टॉगल स्विचेस आणि टाइमझोन */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 items-end">
          <ToggleSwitch label="Auto Detect Timezone" />
          <SelectWithAddBtn label="Default Timezone" required icon={<FaTag />}>
            <option>Asia/Kolkata</option>
            <option>America/New_York</option>
          </SelectWithAddBtn>
          <ToggleSwitch label="App Debug" />
          <ToggleSwitch label="Update App Notification" />
        </div>

        {/* डेट आणि टाइम फॉरमॅट */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          <SelectWithAddBtn label="Date Format" required icon={<FaTag />}>
            <option>(d-m-Y) =&gt; {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</option>
          </SelectWithAddBtn>
          <SelectWithAddBtn label="Time Format" required icon={<FaTag />}>
            <option>(12 Hours hh:mm a) =&gt; {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</option>
          </SelectWithAddBtn>
        </div>

        {/* लॉगइन इमेज अपलोड */}
        <div className="w-full md:w-1/4">
          <LogoUploadField label="Login Image" id="loginImageUpload" />
        </div>

        <hr className="border-gray-100" />

        {/* सेव्ह / अपडेट बटन */}
        <div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition shadow-md">
            Save
          </button>
        </div>

      </div>
    </div>
  );
}