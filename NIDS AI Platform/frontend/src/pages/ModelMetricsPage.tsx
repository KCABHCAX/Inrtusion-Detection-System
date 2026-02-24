import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, ShieldCheck, Crosshair, Target } from 'lucide-react';
import CircularGauge from '../components/CircularGauge';

interface MetricsData {
    accuracy: number;
    precision: number;
    recall: number;
    f1_score: number;
    confusion_matrix: number[][];
    per_model_comparison: Record<string, number>;
}

export default function ModelMetricsPage() {
    const [metrics, setMetrics] = useState<MetricsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In production, this would be an actual API call:
        // axios.get('http://localhost:8000/model-metrics').then(...)

        // Simulating API response based on schemas
        setTimeout(() => {
            setMetrics({
                accuracy: 98.5,
                precision: 98.0,
                recall: 99.0,
                f1_score: 98.5,
                confusion_matrix: [
                    [500, 10],
                    [5, 485]
                ],
                per_model_comparison: {
                    "Ensemble (Proposed)": 98.5,
                    "Random Forest": 97.2,
                    "XGBoost": 98.1,
                    "LSTM": 96.5,
                    "Transformer": 97.0
                }
            });
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-textMuted font-medium">Loading Model Metrics...</p>
            </div>
        );
    }

    if (!metrics) return null;

    const chartData = Object.entries(metrics.per_model_comparison).map(([name, val]) => ({
        name,
        Accuracy: val
    }));

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-text flex items-center gap-2">
                        <Activity className="w-8 h-8 text-primary" />
                        Model Performance Metrics
                    </h1>
                    <p className="text-textMuted mt-1">Cross-validation results across machine learning models.</p>
                </div>
            </div>

            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card p-6 rounded-2xl shadow-soft border border-border flex items-center justify-between hover:shadow-hover transit">
                    <div>
                        <p className="text-sm font-medium text-textMuted uppercase tracking-wider mb-2">Accuracy</p>
                        <p className="text-3xl font-bold text-text flex items-baseline gap-1">
                            {metrics.accuracy}<span className="text-lg text-textMuted font-medium">%</span>
                        </p>
                    </div>
                    <Target className="w-10 h-10 text-primary opacity-20" />
                </div>
                <div className="bg-card p-6 rounded-2xl shadow-soft border border-border flex items-center justify-between hover:shadow-hover transit">
                    <div>
                        <p className="text-sm font-medium text-textMuted uppercase tracking-wider mb-2">Precision</p>
                        <p className="text-3xl font-bold text-text flex items-baseline gap-1">
                            {metrics.precision}<span className="text-lg text-textMuted font-medium">%</span>
                        </p>
                    </div>
                    <Crosshair className="w-10 h-10 text-cyan-500 opacity-20" />
                </div>
                <div className="bg-card p-6 rounded-2xl shadow-soft border border-border flex items-center justify-between hover:shadow-hover transit">
                    <div>
                        <p className="text-sm font-medium text-textMuted uppercase tracking-wider mb-2">Recall</p>
                        <p className="text-3xl font-bold text-text flex items-baseline gap-1">
                            {metrics.recall}<span className="text-lg text-textMuted font-medium">%</span>
                        </p>
                    </div>
                    <ShieldCheck className="w-10 h-10 text-green-500 opacity-20" />
                </div>
                <div className="bg-card p-6 rounded-2xl shadow-soft border border-border flex flex-col items-center justify-center hover:shadow-hover transit">
                    <CircularGauge value={metrics.f1_score} label="F1-Score" color="#10B981" size={100} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Model Comparison Chart */}
                <div className="bg-card p-6 rounded-2xl shadow-soft border border-border lg:col-span-2 hover:shadow-hover transit">
                    <h2 className="text-lg font-semibold text-text mb-6">Model Architecture Comparison</h2>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                <YAxis domain={['dataMin - 5', 100]} axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                <Tooltip
                                    cursor={{ fill: '#F3F4F6' }}
                                    contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Legend iconType="circle" />
                                <Bar dataKey="Accuracy" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Confusion Matrix Heatmap (Simplified CSS version) */}
                <div className="bg-card p-6 rounded-2xl shadow-soft border border-border hover:shadow-hover transit">
                    <h2 className="text-lg font-semibold text-text mb-6">Confusion Matrix (Ensemble)</h2>
                    <div className="flex flex-col h-full justify-center space-y-2 pb-6">
                        <div className="grid grid-cols-3 gap-2">
                            {/* Headers */}
                            <div className="hidden sm:block"></div>
                            <div className="text-center text-xs font-semibold text-textMuted uppercase">Pred Benign</div>
                            <div className="text-center text-xs font-semibold text-textMuted uppercase">Pred Attack</div>

                            {/* Row 1 */}
                            <div className="flex items-center justify-end text-xs font-semibold text-textMuted uppercase pr-2">True Benign</div>
                            <div className="bg-blue-100 rounded-lg p-4 flex flex-col items-center justify-center min-h-[80px]">
                                <span className="text-2xl font-bold text-blue-800">{metrics.confusion_matrix[0][0]}</span>
                                <span className="text-xs text-blue-600">TN</span>
                            </div>
                            <div className="bg-red-50 rounded-lg p-4 flex flex-col items-center justify-center min-h-[80px]">
                                <span className="text-xl font-bold text-red-500">{metrics.confusion_matrix[0][1]}</span>
                                <span className="text-xs text-red-400">FP</span>
                            </div>

                            {/* Row 2 */}
                            <div className="flex items-center justify-end text-xs font-semibold text-textMuted uppercase pr-2">True Attack</div>
                            <div className="bg-red-50 rounded-lg p-4 flex flex-col items-center justify-center min-h-[80px]">
                                <span className="text-xl font-bold text-red-500">{metrics.confusion_matrix[1][0]}</span>
                                <span className="text-xs text-red-400">FN</span>
                            </div>
                            <div className="bg-blue-100 rounded-lg p-4 flex flex-col items-center justify-center min-h-[80px]">
                                <span className="text-2xl font-bold text-blue-800">{metrics.confusion_matrix[1][1]}</span>
                                <span className="text-xs text-blue-600">TP</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
