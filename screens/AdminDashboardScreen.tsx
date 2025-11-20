
import React from 'react';
import { Page } from '../types';
import { ChevronLeftIcon } from '../components/icons';

interface AdminDashboardScreenProps {
    setCurrentPage: (page: Page) => void;
}

const StatCard = ({ title, value, trend, isPositive }: { title: string, value: string, trend: string, isPositive: boolean }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <p className="text-xs text-gray-500 mb-1">{title}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
        <p className={`text-xs mt-1 font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '▲' : '▼'} {trend}
        </p>
    </div>
);

const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({ setCurrentPage }) => {
    return (
        <div className="bg-gray-50 min-h-full pb-10">
            <div className="bg-white p-4 sticky top-0 z-10 border-b border-gray-100 flex items-center">
                <button onClick={() => setCurrentPage(Page.Profile)} className="p-2 -ml-2">
                    <ChevronLeftIcon className="w-6 h-6 text-nailora-purple" />
                </button>
                <h2 className="text-lg font-bold text-nailora-purple ml-2">Developer Dashboard</h2>
            </div>

            <div className="p-4 space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <StatCard title="Total Pelanggan" value="1,240" trend="+12% bulan ini" isPositive={true} />
                    <StatCard title="Pendapatan" value="Rp 35.9jt" trend="+8.5%" isPositive={true} />
                    <StatCard title="Trial Aktif" value="450" trend="+20% (Promo)" isPositive={true} />
                    <StatCard title="Churn Rate" value="2.1%" trend="-0.5% (Membaik)" isPositive={true} />
                </div>

                {/* Recent Transactions (Mock) */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                    <h3 className="font-bold text-gray-800 mb-3">Transaksi Terakhir</h3>
                    <div className="space-y-3">
                         {[1, 2, 3, 4].map(i => (
                             <div key={i} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-none">
                                 <div>
                                     <p className="text-xs font-bold text-gray-700">User #{1000 + i}</p>
                                     <p className="text-[10px] text-gray-500">Nailora Plus • 1 Bulan</p>
                                 </div>
                                 <div className="text-right">
                                     <p className="text-xs font-bold text-green-600">+ Rp 29.000</p>
                                     <p className="text-[10px] text-gray-400">Baru saja</p>
                                 </div>
                             </div>
                         ))}
                    </div>
                </div>
                
                 {/* Feature Usage Chart (Simple Bar Mock) */}
                 <div className="bg-white rounded-xl shadow-sm p-4">
                    <h3 className="font-bold text-gray-800 mb-3">Fitur Premium Terpopuler</h3>
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span>AI Stylist</span>
                                <span className="font-bold">85%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full">
                                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span>Premium Designs</span>
                                <span className="font-bold">72%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full">
                                <div className="bg-pink-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                            </div>
                        </div>
                         <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span>Tutorials</span>
                                <span className="font-bold">45%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardScreen;