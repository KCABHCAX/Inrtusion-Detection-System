import React from 'react';
import { motion } from 'framer-motion';

interface GaugeProps {
    value: number; // 0 to 100
    label: string;
    color?: string;
    size?: number;
}

export default function CircularGauge({ value, label, color = '#2563EB', size = 120 }: GaugeProps) {
    const radius = (size - 20) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center space-y-3">
            <div className="relative flex items-center justify-center leading-none" style={{ width: size, height: size }}>
                {/* Background circle */}
                <svg className="absolute inset-0" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="transparent"
                        stroke="#E5E7EB"
                        strokeWidth="10"
                        className="opacity-50"
                    />
                </svg>

                {/* Progress circle */}
                <svg fill="transparent" className="absolute inset-0 transform -rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    <motion.circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={color}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    />
                </svg>
                <span className="text-2xl font-bold text-text">{value}%</span>
            </div>
            <span className="text-sm font-medium text-textMuted uppercase tracking-wider">{label}</span>
        </div>
    );
}
