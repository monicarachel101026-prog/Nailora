import React, { useState } from 'react';
import { Page } from '../types';
import { ChevronLeftIcon, UploadIcon } from '../components/icons';

interface PartnerRegistrationScreenProps {
  setCurrentPage: (page: Page) => void;
}

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
    const steps = ['Info Dasar', 'Dokumen', 'Akun', 'Selesai'];
    return (
        <div className="flex justify-between items-center mb-6">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                    <div className="flex flex-col items-center text-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${currentStep >= index + 1 ? 'bg-nailora-pink-accent border-nailora-pink-accent text-white' : 'bg-white border-gray-300 text-gray-500'}`}>
                            {currentStep > index + 1 ? '✓' : index + 1}
                        </div>
                        <p className={`text-xs mt-1 font-medium transition-colors duration-300 ${currentStep >= index + 1 ? 'text-nailora-pink-accent' : 'text-gray-500'}`}>{step}</p>
                    </div>
                    {index < steps.length - 1 && <div className={`flex-grow h-0.5 mx-2 transition-colors duration-300 ${currentStep > index + 1 ? 'bg-nailora-pink-accent' : 'bg-gray-300'}`}></div>}
                </React.Fragment>
            ))}
        </div>
    );
};

const FormInput = ({ label, type = 'text', placeholder, name, value, onChange, required = true }: { label: string, type?: string, placeholder?: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, required?: boolean }) => (
    <div>
        <label className="text-sm font-medium text-nailora-purple">{label}{required && <span className="text-red-500">*</span>}</label>
        <input 
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none" 
        />
    </div>
);

const FormTextarea = ({ label, placeholder, name, value, onChange, required = true }: { label: string, placeholder?: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, required?: boolean }) => (
    <div>
        <label className="text-sm font-medium text-nailora-purple">{label}{required && <span className="text-red-500">*</span>}</label>
        <textarea
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            rows={3}
            className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none" 
        />
    </div>
);

const FileUploadField = ({ label, description }: { label: string, description: string }) => {
    const [fileName, setFileName] = useState('');
    const id = label.replace(/\s+/g, '-').toLowerCase();
    return (
        <div className="bg-gray-50 p-3 rounded-lg">
            <label className="text-sm font-semibold text-nailora-purple">{label}</label>
            <p className="text-xs text-nailora-gray mb-2">{description}</p>
            <input 
                type="file"
                id={id}
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
            />
            <label htmlFor={id} className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-nailora-gray hover:border-nailora-pink-accent hover:text-nailora-pink-accent transition-colors cursor-pointer">
                <UploadIcon className="w-5 h-5 mr-2"/>
                <span className="text-sm font-semibold truncate">{fileName || 'Pilih File'}</span>
            </label>
        </div>
    );
};

const PartnerRegistrationScreen: React.FC<PartnerRegistrationScreenProps> = ({ setCurrentPage }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        businessName: '',
        address: '',
        isMobile: false,
        phone: '',
        email: '',
        services: '',
        hours: '',
    });
    const [agreed, setAgreed] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleBackClick = () => {
        if (step > 1) {
            prevStep();
        } else {
            setCurrentPage(Page.Dashboard);
        }
    };

    const handleSubmit = () => {
        // Here you would normally send the data to a server
        console.log("Form submitted:", formData);
        nextStep(); // Go to the final confirmation step
    };

    return (
        <div className="bg-gray-50 min-h-full">
            <div className="p-4 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-10 border-b border-gray-100 flex items-center">
                <button onClick={handleBackClick} className="p-2">
                    <ChevronLeftIcon className="w-6 h-6 text-nailora-purple"/>
                </button>
                <h2 className="text-xl font-bold text-center text-nailora-purple flex-grow -ml-8">Daftar Jadi Partner</h2>
            </div>

            <div className="p-6">
                <StepIndicator currentStep={step} />

                {step === 1 && (
                    <div className="space-y-4 animate-fade-in">
                        <h3 className="text-lg font-bold text-nailora-purple mb-2">1. Informasi Dasar</h3>
                        <FormInput label="Nama Usaha / Lengkap" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Contoh: Salon Cantik / Sarah Martinez" />
                        <FormTextarea label="Alamat Lengkap" name="address" value={formData.address} onChange={handleChange} placeholder="Jalan, Nomor, Kota" />
                        <div className="flex items-center">
                            <input type="checkbox" id="isMobile" name="isMobile" checked={formData.isMobile} onChange={handleCheckboxChange} className="h-4 w-4 rounded border-gray-300 text-nailora-pink-accent focus:ring-nailora-pink-accent"/>
                            <label htmlFor="isMobile" className="ml-2 block text-sm text-nailora-gray">Saya melayani datang ke pelanggan (mobile service)</label>
                        </div>
                        <FormInput label="Nomor Telepon / WA Aktif" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="08123456789" />
                        <FormInput label="Email (Opsional)" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="anda@email.com" required={false} />
                        <FormTextarea label="Jenis Layanan" name="services" value={formData.services} onChange={handleChange} placeholder="Manicure, Pedicure, Nail Art, Gel Polish, etc." />
                        <FormTextarea label="Jam Operasional" name="hours" value={formData.hours} onChange={handleChange} placeholder="Senin - Jumat: 09:00 - 18:00" />
                        <button onClick={nextStep} className="w-full bg-nailora-pink-accent text-white font-semibold py-3 mt-4 rounded-lg shadow-lg hover:bg-opacity-90">Lanjut</button>
                    </div>
                )}
                
                {step === 2 && (
                    <div className="space-y-4 animate-fade-in">
                        <h3 className="text-lg font-bold text-nailora-purple mb-2">2. Data Pendukung</h3>
                         <FileUploadField label="Foto Hasil Karya" description="Upload beberapa foto nail art terbaik Anda." />
                         <FileUploadField label="Foto Tempat Usaha" description="Jika punya salon atau studio." />
                         <FileUploadField label="Foto Alat & Perlengkapan" description="Untuk menunjukkan kualitas layanan." />
                         <FileUploadField label="Foto KTP atau NPWP" description="Untuk verifikasi identitas." />
                        <div className="flex gap-3 mt-4">
                            <button onClick={prevStep} className="w-full bg-gray-200 text-nailora-gray font-semibold py-3 rounded-lg hover:bg-gray-300">Kembali</button>
                            <button onClick={nextStep} className="w-full bg-nailora-pink-accent text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-opacity-90">Lanjut</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                     <div className="space-y-4 animate-fade-in">
                        <h3 className="text-lg font-bold text-nailora-purple mb-2">3. Akun & Komisi</h3>
                        <div className="bg-white p-4 rounded-lg border">
                            <h4 className="font-semibold text-nailora-purple">Syarat & Ketentuan</h4>
                            <p className="text-xs text-nailora-gray mt-2">Dengan mendaftar sebagai partner, Anda menyetujui pembagian komisi sebesar 15% dari setiap booking yang didapatkan melalui aplikasi Nailora. Pembayaran akan ditransfer secara otomatis ke rekening terdaftar setiap akhir pekan.</p>
                        </div>
                         <div className="flex items-start mt-4">
                            <input type="checkbox" id="agreed" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="h-4 w-4 mt-1 rounded border-gray-300 text-nailora-pink-accent focus:ring-nailora-pink-accent"/>
                            <label htmlFor="agreed" className="ml-2 block text-sm text-nailora-gray">Saya telah membaca dan menyetujui Syarat & Ketentuan yang berlaku.</label>
                        </div>
                        <div className="flex gap-3 mt-4">
                            <button onClick={prevStep} className="w-full bg-gray-200 text-nailora-gray font-semibold py-3 rounded-lg hover:bg-gray-300">Kembali</button>
                            <button onClick={handleSubmit} disabled={!agreed} className="w-full bg-nailora-pink-accent text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-opacity-90 disabled:bg-opacity-50">Kirim Pendaftaran</button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="text-center p-6 bg-white rounded-2xl shadow-lg animate-fade-in">
                         <h3 className="text-xl font-bold text-nailora-purple">Pendaftaran Terkirim! 🎉</h3>
                         <p className="text-nailora-gray mt-2 mb-4">Terima kasih telah mendaftar. Pendaftaran Anda sedang kami tinjau. Kami akan memberitahu Anda melalui notifikasi atau email jika sudah disetujui.</p>
                         <button onClick={() => setCurrentPage(Page.Dashboard)} className="w-full bg-nailora-pink-accent text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-opacity-90">Kembali ke Beranda</button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default PartnerRegistrationScreen;