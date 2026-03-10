import { useState } from "react";
import Layout from "../../../component/admin/Layout";
import { FaCalendarCheck, FaTrash } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function LeadFollowup() {

const [showPopup,setShowPopup] = useState(false)

const data = [
{
id:1,
ref:"---",
campaign:"Jillian Stanley",
time:"06-03-2026 10:07 am",
follow:"Admin"
}
]

return (


<div className="p-4 md:p-6">

<h1 className="text-2xl font-bold mb-4 dark:text-white">
Lead Follow Up
</h1>

<div className="flex flex-col md:flex-row md:justify-end gap-3 mb-4">

<select className="border rounded-lg px-3 py-2 text-sm dark:bg-slate-800 dark:text-white">
<option>Select Campaign...</option>
<option>Campaign 1</option>
<option>Campaign 2</option>
</select>

<select className="border rounded-lg px-3 py-2 text-sm dark:bg-slate-800 dark:text-white">
<option>Admin</option>
<option>Test1</option>
<option>Test2</option>
<option>Team Leader</option>
</select>

<div className="flex border rounded-lg overflow-hidden">

<input
type="date"
className="px-3 py-2 text-sm outline-none dark:bg-slate-800 dark:text-white"
/>

<span className="px-2 flex items-center text-gray-400">
→
</span>

<input
type="date"
className="px-3 py-2 text-sm outline-none dark:bg-slate-800 dark:text-white"
/>

</div>

</div>


<div className="hidden md:block bg-white dark:bg-slate-800 rounded-xl shadow overflow-x-auto">

<table className="w-full text-sm">

<thead className="border-b text-gray-500">
<tr>

<th className="p-3">
<input type="checkbox"/>
</th>

<th className="p-3 text-left">
Reference Number
</th>

<th className="p-3 text-left">
Campaign Name
</th>

<th className="p-3 text-left">
Follow Up Time
</th>

<th className="p-3 text-left">
Follow Up By
</th>

<th className="p-3 text-left">
Action
</th>

</tr>
</thead>

<tbody>

{data.map((item)=>(
<tr key={item.id} className="border-b">

<td className="p-3">
<input type="checkbox"/>
</td>

<td className="p-3 text-blue-500">
{item.ref}
</td>

<td className="p-3">
{item.campaign}
</td>

<td className="p-3">
{item.time}
</td>

<td className="p-3">
{item.follow}
</td>

<td className="p-3 flex gap-2">

<button
onClick={()=>setShowPopup(true)}
className="bg-blue-500 text-white p-2 rounded-md"
>
<MdKeyboardDoubleArrowRight/>
</button>

<button className="bg-red-500 text-white p-2 rounded-md">
<FaTrash/>
</button>

</td>

</tr>
))}

</tbody>
</table>

</div>



<div className="md:hidden space-y-4">

{data.map((item)=>(
<div
key={item.id}
className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow"
>

<div className="flex justify-between mb-2">
<span className="text-gray-500">
Reference
</span>
<span className="text-blue-500">
{item.ref}
</span>
</div>

<div className="flex justify-between mb-2">
<span className="text-gray-500">
Campaign
</span>
<span>
{item.campaign}
</span>
</div>

<div className="flex justify-between mb-2">
<span className="text-gray-500">
Follow Time
</span>
<span>
{item.time}
</span>
</div>

<div className="flex justify-between mb-3">
<span className="text-gray-500">
Follow By
</span>
<span>
{item.follow}
</span>
</div>

<div className="flex gap-2">

<button
onClick={()=>setShowPopup(true)}
className="flex-1 bg-blue-500 text-white py-2 rounded-md"
>
Start
</button>

<button className="flex-1 bg-red-500 text-white py-2 rounded-md">
Delete
</button>

</div>

</div>
))}

</div>



{showPopup && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white rounded-xl p-6 w-[90%] md:w-[400px] text-center">

<h2 className="text-lg font-semibold mb-2">
Start?
</h2>

<p className="text-gray-500 mb-6">
Are you sure you want to start this follow up lead...
</p>

<div className="flex justify-center gap-4">

<button
onClick={()=>setShowPopup(false)}
className="px-4 py-2 border rounded-lg"
>
No
</button>

<button
onClick={()=>setShowPopup(false)}
className="px-4 py-2 bg-red-500 text-white rounded-lg"
>
Yes
</button>

</div>

</div>

</div>

)}

</div>


)
}