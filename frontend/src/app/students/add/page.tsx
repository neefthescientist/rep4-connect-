'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

export default function AddStudentPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    school: '',
    educationLevel: 'High School',
    gradYear: '2027',
    cohort: '2026',
    interests: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          gradYear: parseInt(formData.gradYear, 10),
          cohort: parseInt(formData.cohort, 10),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to submit student record.');
      }

      router.push('/students');
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/students"
          className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add New Student</h1>
          <p className="text-sm text-slate-500">Register a new participant in the REP4 program database.</p>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">First Name</label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              placeholder="e.g. Alex"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Last Name</label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              placeholder="e.g. Smith"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Address</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            placeholder="alex.smith@example.com"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">School</label>
            <input
              type="text"
              required
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              placeholder="e.g. Grand Valley High"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Education Level</label>
            <select
              value={formData.educationLevel}
              onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            >
              <option value="Middle School">Middle School</option>
              <option value="High School">High School</option>
              <option value="College">College</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Graduation Year</label>
            <input
              type="number"
              value={formData.gradYear}
              onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Interests (Comma Separated)</label>
          <textarea
            rows={3}
            value={formData.interests}
            onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            placeholder="Robotics, Agricultural Tech, Web Development..."
          />
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
          <Link
            href="/students"
            className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors disabled:opacity-50"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Student Record
          </button>
        </div>
      </form>
    </div>
  );
}