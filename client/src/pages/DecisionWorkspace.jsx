import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getDecision, updateDecision, evaluateDecision } from '../services/api';
import { Plus, Trash2, Save, BarChart3, Check, Award, AlertCircle } from 'lucide-react';

const TabButton = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${active ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
    >
        {children}
    </button>
);

export default function DecisionWorkspace() {
    const { id } = useParams();
    const [decision, setDecision] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('options'); // options | scoring | results
    const [saving, setSaving] = useState(false);
    const [evaluation, setEvaluation] = useState(null);

    const loadDecision = useCallback(async () => {
        try {
            const data = await getDecision(id);
            setDecision(data.data);
        } catch (error) {
            console.error("Failed to load decision", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        loadDecision();
    }, [loadDecision]);

    const handleAddOption = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        if (!name) return;

        const updatedOptions = [...(decision.options || []), { name, scores: {} }];

        try {
            setSaving(true);
            const res = await updateDecision(id, { options: updatedOptions });
            setDecision(res.data);
            e.target.reset();
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteOption = async (optionId) => {
        const updatedOptions = decision.options.filter(opt => opt._id !== optionId);
        try {
            setSaving(true);
            const res = await updateDecision(id, { options: updatedOptions });
            setDecision(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    }

    const handleScoreChange = (optionIndex, criteriaId, value) => {
        const newOptions = [...decision.options];
        // Ensure scores object exists
        if (!newOptions[optionIndex].scores) newOptions[optionIndex].scores = {};

        newOptions[optionIndex].scores[criteriaId] = Number(value);
        setDecision({ ...decision, options: newOptions });
    };

    const saveScores = async () => {
        try {
            setSaving(true);
            const res = await updateDecision(id, { options: decision.options });
            setDecision(res.data);
            setActiveTab('results'); // Auto move to results after saving
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const runEvaluation = useCallback(async () => {
        try {
            const res = await evaluateDecision(id);
            setEvaluation(res.data);
        } catch (err) {
            console.error(err);
        }
    }, [id]);

    useEffect(() => {
        if (activeTab === 'results') {
            runEvaluation();
        }
    }, [activeTab, runEvaluation]);

    if (loading) return <div className="p-8 text-center">Loading workspace...</div>;
    if (!decision) return <div className="p-8 text-center text-red-500">Decision not found</div>;

    return (
        <div className="space-y-6">
            <header className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h1 className="text-2xl font-bold text-slate-900">{decision.title}</h1>
                {decision.description && <p className="text-slate-500 mt-2">{decision.description}</p>}

                <div className="mt-6 flex border-b border-slate-200">
                    <TabButton active={activeTab === 'options'} onClick={() => setActiveTab('options')}>
                        1. Options
                    </TabButton>
                    <TabButton active={activeTab === 'scoring'} onClick={() => setActiveTab('scoring')}>
                        2. Scoring
                    </TabButton>
                    <TabButton active={activeTab === 'results'} onClick={() => setActiveTab('results')}>
                        3. Results
                    </TabButton>
                </div>
            </header>

            <main className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-h-[400px]">
                {activeTab === 'options' && (
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-slate-800">Available Options</h3>
                            {(!decision.options || decision.options.length === 0) && (
                                <div className="p-8 text-center bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 text-slate-400">
                                    No options added yet. Add your first candidate below.
                                </div>
                            )}
                            <div className="grid gap-4">
                                {decision.options?.map((opt) => (
                                    <div key={opt._id} className="flex justify-between items-center p-4 bg-slate-50 rounded-lg border border-slate-200">
                                        <span className="font-medium text-slate-700">{opt.name}</span>
                                        <button
                                            onClick={() => handleDeleteOption(opt._id)}
                                            className="text-slate-400 hover:text-red-500 transition"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleAddOption} className="flex gap-4 items-end pt-4 border-t border-slate-100">
                            <div className="flex-grow">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Add New Option</label>
                                <input
                                    name="name"
                                    placeholder="e.g., Option A"
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center"
                            >
                                <Plus size={18} className="mr-2" /> Add
                            </button>
                        </form>

                        {decision.options?.length > 1 && (
                            <div className="flex justify-end pt-4">
                                <button
                                    onClick={() => setActiveTab('scoring')}
                                    className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition flex items-center"
                                >
                                    Next: Scoring <BarChart3 size={18} className="ml-2" />
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'scoring' && (
                    <div className="space-y-6">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                                    <tr>
                                        <th className="px-6 py-3 rounded-tl-lg">Option</th>
                                        {decision.criteria.map(c => (
                                            <th key={c._id} className="px-6 py-3 text-center">
                                                <div>{c.name}</div>
                                                <div className="text-xs text-slate-500 font-normal">Weight: {c.weight}</div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {decision.options?.map((opt, optIndex) => (
                                        <tr key={opt._id} className="bg-white border-b hover:bg-slate-50">
                                            <td className="px-6 py-4 font-medium text-slate-900">
                                                {opt.name}
                                            </td>
                                            {decision.criteria.map(c => (
                                                <td key={c._id} className="px-6 py-4 text-center">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="10"
                                                        className="w-20 px-2 py-1 text-center border border-slate-300 rounded focus:ring-blue-500 focus:border-blue-500"
                                                        value={opt.scores?.[c._id] || 0}
                                                        onChange={(e) => handleScoreChange(optIndex, c._id, e.target.value)}
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-end gap-4 p-4 bg-slate-50 rounded-lg">
                            <button
                                onClick={saveScores}
                                disabled={saving}
                                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition flex items-center shadow-md disabled:opacity-50"
                            >
                                <Save size={18} className="mr-2" /> Save & Calculate Results
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'results' && (
                    <div className="max-w-4xl mx-auto space-y-8">
                        {!evaluation ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                <p className="text-slate-500">Crunching the numbers...</p>
                            </div>
                        ) : (
                            <>
                                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl border border-blue-100">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200">
                                            <Award size={32} />
                                        </div>
                                        <div className="space-y-2">
                                            <h2 className="text-2xl font-bold text-slate-900">Recommendation</h2>
                                            <div className="prose text-slate-700">
                                                <p dangerouslySetInnerHTML={{
                                                    // Simple markdown bold parsing for the text returned by backend
                                                    __html: evaluation.explanation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-slate-900 flex items-center">
                                        <BarChart3 className="mr-2 text-slate-500" /> Detailed Ranking
                                    </h3>
                                    <div className="space-y-3">
                                        {evaluation.rankedOptions.map((opt, idx) => (
                                            <div key={idx} className="relative overflow-hidden bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition">
                                                <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full font-bold text-lg ${idx === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-500'}`}>
                                                    #{idx + 1}
                                                </div>
                                                <div className="flex-grow">
                                                    <div className="flex justify-between mb-1">
                                                        <span className="font-bold text-slate-800">{opt.name}</span>
                                                        <span className="font-mono font-bold text-blue-600">{opt.totalScore?.toFixed(2)}</span>
                                                    </div>
                                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                                        <div
                                                            className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                                                            style={{ width: `${(opt.totalScore / 10) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
