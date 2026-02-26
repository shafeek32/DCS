import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2, ArrowRight, Save, Loader2 } from 'lucide-react';
import { createDecision } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CreateDecision() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            description: '',
            criteria: [
                { name: 'Cost', weight: 0.5 },
                { name: 'Quality', weight: 0.5 }
            ]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "criteria"
    });

    const criteriaValues = watch("criteria");
    const totalWeight = criteriaValues?.reduce((sum, c) => sum + (parseFloat(c.weight) || 0), 0);

    const onSubmit = async (data) => {
        if (Math.abs(totalWeight - 1.0) > 0.01) {
            alert("Criteria weights must sum to 1.0");
            return;
        }

        setLoading(true);
        try {
            const response = await createDecision(data);
            if (response.success) {
                navigate(`/decision/${response.data._id}`);
            }
        } catch (error) {
            console.error("Failed to create decision", error);
            alert("Failed to create decision. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Define your Decision</h2>
                <p className="text-slate-500">Step {step} of 2: {step === 1 ? "Basics" : "Criteria"}</p>
                <div className="w-full bg-slate-100 h-2 mt-4 rounded-full overflow-hidden">
                    <div className={`h-full bg-blue-600 transition-all duration-300 ${step === 1 ? 'w-1/2' : 'w-full'}`}></div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {step === 1 && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Decision Title</label>
                            <input
                                {...register("title", { required: "Title is required" })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., Which laptop should I buy?"
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
                            <textarea
                                {...register("description")}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
                                placeholder="Context about this decision..."
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="w-full flex items-center justify-center py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Next: Define Criteria <ArrowRight className="ml-2 w-4 h-4" />
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <div className="bg-blue-50 p-4 rounded-lg flex justify-between items-center">
                            <span className="text-blue-800 font-medium">Total Weight:</span>
                            <span className={`font-bold ${Math.abs(totalWeight - 1) < 0.01 ? 'text-green-600' : 'text-red-500'}`}>
                                {totalWeight.toFixed(2)} / 1.00
                            </span>
                        </div>

                        <div className="space-y-4">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-4 items-start">
                                    <div className="flex-grow">
                                        <input
                                            {...register(`criteria.${index}.name`, { required: true })}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                                            placeholder="Criteria Name (e.g., Cost)"
                                        />
                                    </div>
                                    <div className="w-24">
                                        <input
                                            type="number"
                                            step="0.05"
                                            min="0"
                                            max="1"
                                            {...register(`criteria.${index}.weight`, { required: true, min: 0, max: 1 })}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                                            placeholder="0.5"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="p-2 text-slate-400 hover:text-red-500"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => append({ name: '', weight: 0.1 })}
                            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                        >
                            <Plus className="w-4 h-4 mr-1" /> Add Criterion
                        </button>

                        <div className="pt-6 flex gap-4">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="flex-1 py-3 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={loading || Math.abs(totalWeight - 1) > 0.01}
                                className="flex-1 flex items-center justify-center py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (
                                    <>Save & Continue <Save className="ml-2 w-4 h-4" /></>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
