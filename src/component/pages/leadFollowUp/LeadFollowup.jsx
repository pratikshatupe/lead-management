import Layout from '../../../component/admin/Layout';
import { FaCalendarCheck } from 'react-icons/fa';
export default function LeadFollowup() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold dark:text-white mb-4">Lead Follow Up</h1>
      <div className="flex flex-col items-center justify-center p-20 bg-white dark:bg-slate-800 rounded-xl shadow-sm border">
        <FaCalendarCheck size={50} className="text-green-500 mb-4" />
        <p className="text-gray-500">No follow-ups scheduled for today.</p>
      </div>
    </Layout>
  );
}