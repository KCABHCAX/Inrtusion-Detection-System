import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileType, CheckCircle } from 'lucide-react';

interface FileUploadCardProps {
    onFileUpload: (file: File) => void;
    isUploading: boolean;
}

export default function FileUploadCard({ onFileUpload, isUploading }: FileUploadCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsHovered(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            if (file.name.endsWith('.csv')) {
                setSelectedFile(file);
            } else {
                alert('Please upload a valid CSV file.');
            }
        }
    }, []);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsHovered(true);
    };

    const handleDragLeave = () => {
        setIsHovered(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.name.endsWith('.csv')) {
                setSelectedFile(file);
            } else {
                alert('Please upload a valid CSV file.');
            }
        }
    };

    const handleUploadSubmit = () => {
        if (selectedFile) {
            onFileUpload(selectedFile);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative group bg-card p-8 rounded-2xl shadow-soft border border-border hover:shadow-hover transit"
        >
            {/* Animated glow on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transit transition duration-500" />

            <div className="relative bg-card rounded-2xl h-full flex flex-col items-center justify-center">
                {!selectedFile ? (
                    <div
                        className={`w-full border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 ${isHovered ? 'border-primary bg-blue-50/50' : 'border-gray-300 hover:border-primary hover:bg-slate-50'}`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => document.getElementById('file-upload')?.click()}
                    >
                        <motion.div
                            animate={{ y: isHovered ? -5 : 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <UploadCloud className={`w-12 h-12 mb-4 ${isHovered ? 'text-primary' : 'text-slate-400'}`} />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-text mb-1">Drag and drop your network flow</h3>
                        <p className="text-sm text-textMuted text-center max-w-xs">
                            Upload a `.csv` file containing flow features for immediate AI threat analysis.
                        </p>
                        <p className="text-xs text-textMuted mt-6 flex items-center gap-1">
                            <FileType className="w-3 h-3" /> Maximum file size: 50MB
                        </p>
                        <input
                            id="file-upload"
                            type="file"
                            accept=".csv"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                ) : (
                    <div className="w-full flex flex-col items-center justify-center p-8 border border-border rounded-xl bg-slate-50">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-primary">
                            <FileType className="w-8 h-8" />
                        </div>
                        <p className="font-medium text-text truncate max-w-[250px]">{selectedFile.name}</p>
                        <p className="text-xs text-textMuted mb-6">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB • CSV</p>

                        <div className="flex gap-3 w-full">
                            <button
                                onClick={() => setSelectedFile(null)}
                                className="flex-1 py-2 px-4 rounded-lg border border-border text-sm font-medium text-text hover:bg-gray-100 transit"
                                disabled={isUploading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUploadSubmit}
                                disabled={isUploading}
                                className="flex-1 py-2 px-4 rounded-lg bg-primary text-white text-sm font-medium hover:bg-blue-700 transit flex items-center justify-center gap-2"
                            >
                                {isUploading ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                    />
                                ) : (
                                    <>
                                        <CheckCircle className="w-4 h-4" /> Analyze
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                <div className="mt-6 text-center text-xs text-gray-400">
                    By uploading, you agree to our <a href="#" className="underline hover:text-primary">Data Policy</a> and <a href="#" className="underline hover:text-primary">Terms of Service</a>.
                </div>
            </div>
        </motion.div>
    );
}
