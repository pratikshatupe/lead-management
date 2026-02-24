import Layout from "../admin/Layout";
import { FaUserCircle, FaEnvelope, FaShieldAlt } from "react-icons/fa";

export default function AdminProfile() {
  const userRole = localStorage.getItem("role");

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 dark:text-white transition-colors">Admin Profile</h1>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-8 border dark:border-slate-700 transition-all">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-gray-300 dark:text-slate-600">
              <FaUserCircle size={120} />
            </div>
            
            <div className="space-y-4 flex-1">
              <div>
                <label className="text-sm text-gray-500 dark:text-slate-400">Full Name</label>
                <p className="text-xl font-semibold dark:text-white tracking-wide">Administrator</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500 dark:text-slate-400 flex items-center gap-2">
                    <FaEnvelope /> Email Address
                  </label>
                  <p className="font-medium dark:text-gray-200">admin@leadpro.com</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-slate-400 flex items-center gap-2">
                    <FaShieldAlt /> Role
                  </label>
                  <p className="font-medium uppercase text-teal-600 dark:text-teal-400">{userRole}</p>
                </div>
              </div>

              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}