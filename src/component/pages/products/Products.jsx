import React, { useState, useEffect } from 'react';
import Layout from "../../../component/admin/Layout"; 
import { Plus, Search, ChevronDown, PackageOpen, X, Upload, Trash2, DollarSign, Percent, Tag } from 'lucide-react';

function Products() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    logo: '', type: 'Product', name: '', price: '', taxLabel: '', taxRate: '0'
  });

  useEffect(() => {
    const savedProducts = localStorage.getItem('my_products_list');
    if (savedProducts) setProducts(JSON.parse(savedProducts));
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, logo: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = () => {
    if (!formData.name || !formData.price) {
      alert("Please fill required fields!");
      return;
    }
    const newProduct = { ...formData, id: Date.now() };
    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem('my_products_list', JSON.stringify(updated));
    setFormData({ logo: '', type: 'Product', name: '', price: '', taxLabel: '', taxRate: '0' });
    setIsDrawerOpen(false);
  };

  const deleteProduct = (id) => {
    if (window.confirm("Delete this product?")) {
      const filtered = products.filter(p => p.id !== id);
      setProducts(filtered);
      localStorage.setItem('my_products_list', JSON.stringify(filtered));
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-slate-900 pb-10">
        
        {isDrawerOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={() => setIsDrawerOpen(false)}></div>}
        <div className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white dark:bg-slate-800 shadow-2xl z-50 transform transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center p-4 border-b dark:border-slate-700">
            <h2 className="text-lg font-semibold dark:text-white">Add New Product</h2>
            <button onClick={() => setIsDrawerOpen(false)}><X size={24} className="text-gray-400" /></button>
          </div>
          <div className="p-6 space-y-4">
             {/* Logo Upload */}
             <div>
                <input type="file" id="logoUpload" hidden onChange={handleImageUpload} />
                <label htmlFor="logoUpload" className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-lg w-24 h-24 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50 dark:bg-slate-900">
                  {formData.logo ? <img src={formData.logo} className="w-full h-full object-cover" /> : <Plus className="text-gray-400" />}
                </label>
             </div>
             <input type="text" placeholder="Product Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded dark:bg-slate-900 dark:text-white dark:border-slate-700" />
             <input type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full p-2 border rounded dark:bg-slate-900 dark:text-white dark:border-slate-700" />
             <input type="text" placeholder="Tax Label" value={formData.taxLabel} onChange={e => setFormData({...formData, taxLabel: e.target.value})} className="w-full p-2 border rounded dark:bg-slate-900 dark:text-white dark:border-slate-700" />
             <button onClick={handleSaveProduct} className="w-full bg-[#0095ff] text-white p-3 rounded-lg font-bold">Create Product</button>
          </div>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold dark:text-white">Products</h1>
            <button onClick={() => setIsDrawerOpen(true)} className="bg-[#0095ff] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
              <Plus size={18} /> <span className="hidden sm:inline">Add New Product</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 relative">
                  <button onClick={() => deleteProduct(product.id)} className="absolute top-4 right-4 text-red-400">
                    <Trash2 size={18} />
                  </button>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-16 h-16 rounded-lg border dark:border-slate-700 overflow-hidden bg-gray-50 flex-shrink-0">
                      {product.logo ? <img src={product.logo} className="w-full h-full object-cover" /> : <PackageOpen className="m-4 text-gray-300" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white">{product.name}</h3>
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded dark:bg-blue-900/20">{product.type}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 border-t dark:border-slate-700 pt-3 mt-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <DollarSign size={14} className="text-green-500" />
                      <span className="font-semibold text-gray-900 dark:text-white">${product.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Tag size={14} className="text-orange-500" />
                      <span>{product.taxLabel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Percent size={14} className="text-blue-500" />
                      <span>{product.taxRate}% Rate</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-10 bg-white dark:bg-slate-800 rounded-xl">No products found</div>
            )}
          </div>

          <div className="hidden md:block bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-slate-900/50 text-gray-500 text-[11px] font-bold uppercase">
                <tr>
                  <th className="p-4">Logo</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Tax</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-slate-700">
                {products.map((product) => (
                  <tr key={product.id} className="dark:text-white text-sm hover:bg-gray-50 dark:hover:bg-slate-700/40">
                    <td className="p-4">
                      <div className="w-10 h-10 rounded border overflow-hidden">
                        {product.logo ? <img src={product.logo} className="w-full h-full object-cover" /> : <PackageOpen size={20} className="m-2 text-gray-300" />}
                      </div>
                    </td>
                    <td className="p-4 font-medium">{product.name}</td>
                    <td className="p-4">{product.type}</td>
                    <td className="p-4 text-blue-500 font-bold">${product.price}</td>
                    <td className="p-4 text-xs">{product.taxLabel} ({product.taxRate}%)</td>
                    <td className="p-4 text-center">
                      <button onClick={() => deleteProduct(product.id)} className="text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default Products;