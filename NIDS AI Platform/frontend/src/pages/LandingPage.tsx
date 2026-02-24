import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Activity, BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FileUploadCard from '../components/FileUploadCard';

export default function LandingPage() {
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    const handleFileUpload = (file: File) => {
        setIsUploading(true);
        // Simulate API call to backend
        setTimeout(() => {
            setIsUploading(false);
            navigate('/analysis');
        }, 2000);
    };

    return (
        <div className="max-w-7xl mx-auto min-h-[calc(100vh-80px)] flex flex-col items-center justify-center pt-10 pb-20 lg:pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary text-sm font-medium border border-blue-100">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Next-Gen Enterprise Protection
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-text leading-[1.15]">
                        AI-Driven <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">
                            Network Intrusion
                        </span> <br />
                        Detection.
                    </h1>

                    <p className="text-lg text-textMuted max-w-lg leading-relaxed">
                        Protect your infrastructure with our highly accurate ensemble models. Get deep explainability, risk-aware scoring, and calibrated confidence on every network flow.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            onClick={() => document.getElementById('file-upload')?.click()}
                            className="px-6 py-3 rounded-lg bg-text text-white font-medium hover:bg-black transit flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                            Analyze Traffic <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => navigate('/metrics')}
                            className="px-6 py-3 rounded-lg bg-white border border-border text-text font-medium hover:bg-gray-50 transit flex items-center justify-center gap-2 shadow-sm"
                        >
                            <Activity className="w-4 h-4 text-primary" /> View Model Metrics
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-10 border-t border-border/50">
                        <div className="flex flex-col gap-2">
                            <ShieldCheck className="w-6 h-6 text-green-500" />
                            <span className="font-semibold text-text">Risk-Aware Scoring</span>
                            <span className="text-sm text-textMuted">Adaptive confidence thresholds ensure minimal false positives.</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <BrainCircuit className="w-6 h-6 text-purple-500" />
                            <span className="font-semibold text-text">Explainable AI</span>
                            <span className="text-sm text-textMuted">SHAP diagnostics provide actionable insights for every alert.</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Content / Upload UI */}
                <div className="relative w-full max-w-md mx-auto">
                    {/* Abstract background shapes */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute top-1/4 right-0 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />

                    <FileUploadCard onFileUpload={handleFileUpload} isUploading={isUploading} />
                </div>
            </div>
        </div>
    );
}
