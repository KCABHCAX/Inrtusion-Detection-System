import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Activity, BarChart2, AlertCircle, Info, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import CircularGauge from '../components/CircularGauge';

interface AnalysisResult {
    traffic_type: string;
    risk_level: string;
    confidence: number;
    confidence_level: 'High' | 'Medium' | 'Low';
    priority: string;
    anomaly_status: string;
    description: string;
    dos: string[];
    donts: string[];
    class_probabilities: Record<string, number>;
    raw_confidence: number;
    calibrated_confidence: number;
    timestamp: string;
}

export default function FlowAnalysisPage() {
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating API response
        setTimeout(() => {
            setResult({
                traffic_type: "DDoS Attack",
                risk_level: "High",
                confidence: 96.5,
                confidence_level: "High",
                priority: "P1 - Critical",
                anomaly_status: "Anomalous",
                description: "The flow exhibits characteristics of a volumetric DDoS attack. The request rate is significantly higher than the baseline profile and SHAP values indicate packet size variance is the strongest predictor.",
                dos: ["Isolate the source IP immediately.", "Enable rate limiting on edge routers."],
                donts: ["Do not ignore if confidence drops to medium—monitor closely.", "Do not reset the server without capturing logs."],
                class_probabilities: {
                    "Benign": 0.02,
                    "DDoS Attack": 0.965,
                    "Port Scan": 0.015
                },
                raw_confidence: 91.2,
                calibrated_confidence: 96.5,
                timestamp: new Date().toISOString()
            });
            setLoading(false);
        }, 1500);
    }, []);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-textMuted font-medium">Analyzing Flow Data...</p>
            </div>
        );
    }

    if (!result) return null;

    const isAttack = result.traffic_type !== "Benign";
    const confidenceColor = result.confidence_level === 'High' ? '#10B981' : result.confidence_level === 'Medium' ? '#F59E0B' : '#EF4444';
    const riskColor = result.risk_level === 'High' ? 'text-red-600 bg-red-50 border-red-200' :
        result.risk_level === 'Medium' ? 'text-orange-600 bg-orange-50 border-orange-200' :
            'text-green-600 bg-green-50 border-green-200';

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-fade-in relative">

            {/* Background structural glow based on status */}
            <div className={`fixed inset-0 pointer-events-none transition-colors duration-1000 -z-10 ${isAttack ? 'bg-red-50/20' : 'bg-green-50/20'}`} />

            {/* Top Banner */}
            <motion.div
                initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
                className={`p-4 rounded-xl border shadow-sm flex items-center justify-between ${isAttack ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}
            >
                <div className="flex items-center gap-3">
                    {isAttack ? <ShieldAlert className="w-8 h-8 text-red-500" /> : <ShieldCheck className="w-8 h-8 text-green-500" />}
                    <div>
                        <h2 className={`font-bold text-lg ${isAttack ? 'text-red-900' : 'text-green-900'}`}>
                            {isAttack ? `Threat Detected: ${result.traffic_type}` : 'Traffic is Benign'}
                        </h2>
                        <p className={isAttack ? 'text-red-700 text-sm' : 'text-green-700 text-sm'}>
                            Analysis completed at {new Date(result.timestamp).toLocaleTimeString()}
                        </p>
                    </div>
                </div>
                <div className={`px-4 py-2 rounded-lg font-bold text-sm ${riskColor}`}>
                    Priority: {result.priority}
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Risk Assessment Card */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-card p-6 rounded-2xl shadow-soft border border-border flex flex-col h-full"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-text text-lg">Risk Assessment</h3>
                    </div>

                    <div className="flex-grow flex flex-col sm:flex-row items-center justify-between px-4 sm:px-10 mb-8">
                        <div className="text-center sm:text-left mb-6 sm:mb-0">
                            <p className="text-textMuted text-sm uppercase tracking-wider font-semibold mb-1">Risk Level</p>
                            <p className={`text-4xl font-extrabold ${result.risk_level === 'High' ? 'text-red-600' : result.risk_level === 'Medium' ? 'text-orange-500' : 'text-green-500'}`}>
                                {result.risk_level}
                            </p>
                            <div className="mt-4 flex items-center gap-2 text-sm text-textMuted">
                                <AlertCircle className="w-4 h-4" />
                                Anomaly: <span className="font-semibold text-text">{result.anomaly_status}</span>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center">
                            <p className="text-xs text-textMuted font-medium uppercase mb-2">Confidence Level</p>
                            <CircularGauge value={result.confidence} label={result.confidence_level} color={confidenceColor} size={110} />
                        </div>
                    </div>

                    <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 mt-auto">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-blue-900 text-sm mb-1">AI Explanation Summary</h4>
                                <p className="text-blue-800 text-sm leading-relaxed">{result.description}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>


                {/* Confidence Diagnostics Card */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-card p-6 rounded-2xl shadow-soft border border-border flex flex-col h-full"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart2 className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-text text-lg">Confidence Diagnostics</h3>
                    </div>

                    <div className="space-y-6 mb-8">
                        {/* Calibration vs Raw */}
                        <div>
                            <p className="text-sm font-medium text-textMuted mb-3 flex items-center justify-between">
                                Raw vs Calibrated Confidence
                            </p>
                            <div className="space-y-4">
                                <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-between">
                                        <div className="text-xs font-semibold inline-block text-slate-500 uppercase">Raw Confidence</div>
                                        <div className="text-right"><span className="text-xs font-semibold inline-block text-slate-700">{result.raw_confidence}%</span></div>
                                    </div>
                                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-100">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${result.raw_confidence}%` }} transition={{ duration: 1 }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-slate-400"></motion.div>
                                    </div>
                                </div>

                                <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-between">
                                        <div className="text-xs font-semibold inline-block text-primary uppercase">Calibrated Confidence</div>
                                        <div className="text-right"><span className="text-xs font-semibold inline-block text-primary">{result.calibrated_confidence}%</span></div>
                                    </div>
                                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${result.calibrated_confidence}%` }} transition={{ duration: 1.2 }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-border pt-4 mt-auto">
                            <p className="text-sm font-medium text-textMuted mb-3">Ensemble Class Probabilities</p>
                            <div className="space-y-3">
                                {Object.entries(result.class_probabilities).sort((a, b) => b[1] - a[1]).map(([className, prob]) => (
                                    <div key={className} className="flex items-center">
                                        <div className="w-32 truncate text-sm font-medium text-text">{className}</div>
                                        <div className="flex-grow ml-4">
                                            <div className="w-full bg-slate-100 rounded-full h-1.5">
                                                <motion.div
                                                    initial={{ width: 0 }} animate={{ width: `${prob * 100}%` }} transition={{ duration: 0.8 }}
                                                    className={`h-1.5 rounded-full ${prob > 0.5 ? (className === 'Benign' ? 'bg-green-500' : 'bg-red-500') : 'bg-slate-300'}`}
                                                ></motion.div>
                                            </div>
                                        </div>
                                        <div className="w-12 text-right text-xs text-textMuted font-medium ml-4">
                                            {(prob * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Action Plan Section */}
            <motion.div
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-6"
            >
                <h3 className="font-semibold text-text text-lg mb-4 ml-1">Recommended Action Plan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border pt-2">
                    <div className="bg-card p-5 rounded-xl border-l-4 border-l-green-500 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <h4 className="font-semibold text-text">Do's</h4>
                        </div>
                        <ul className="space-y-2">
                            {result.dos.map((item, i) => (
                                <li key={i} className="text-sm text-text flex items-start">
                                    <span className="text-green-500 mr-2 shrink-0">•</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-card p-5 rounded-xl border-l-4 border-l-red-500 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <XCircle className="w-5 h-5 text-red-500" />
                            <h4 className="font-semibold text-text">Don'ts</h4>
                        </div>
                        <ul className="space-y-2">
                            {result.donts.map((item, i) => (
                                <li key={i} className="text-sm text-text flex items-start">
                                    <span className="text-red-500 mr-2 shrink-0">•</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
