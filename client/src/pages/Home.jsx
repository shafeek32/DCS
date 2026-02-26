import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Scale, CheckCircle2, Zap } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-8">
            <div className="space-y-4 max-w-3xl">
                <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                    Make Better Decisions, <br />
                    <span className="text-blue-600">Backed by Math.</span>
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Stop guessing. Use the Weighted Scoring Model to evaluate options objectively and find the best path forward.
                </p>
            </div>

            <Link
                to="/create"
                className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
                Start Decision
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="grid md:grid-cols-3 gap-8 mt-20 text-left">
                {[
                    { icon: Scale, title: "Weighted Criteria", desc: "Assign importance to what matters most to you." },
                    { icon: Zap, title: "Instant Analysis", desc: "Get immediate ranking results based on your inputs." },
                    { icon: CheckCircle2, title: "Clear Explanations", desc: "Understand exactly why an option won." },
                ].map((feature, idx) => (
                    <div key={idx} className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <feature.icon className="h-10 w-10 text-blue-500 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                        <p className="text-slate-500 mt-2">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
