'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, User, Filter, AlertCircle } from 'lucide-react';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  school: string;
  educationLevel: string;
  gradYear: number;
  cohort: number;
  status: string;
  interests?: string[];
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch('/api/students');
        if (!res.ok) throw new Error('Failed to load student data');
        const data = await res.json();
        setStudents(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((s) => {
    const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
    const term = searchTerm.toLowerCase();
    return fullName.includes(term) || s.email.toLowerCase().includes(term) || s.school.toLowerCase().includes(term);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Student Database</h1>
          <p className="text-sm text-slate-500">Manage participant profiles, cohorts, and status tracking.</p>
        </div>
        <Link
          href="/students/add"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors w-fit"
        >
          <Plus className="h-4 w-4" /> Add Student
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or school..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 pl-9 pr-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center text-slate-500 text-sm">
          Loading students from database...
        </div>
      ) : error ? (
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-800 text-sm flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600" />
          <span>Could not connect to database ({error}). Please verify PostgreSQL connection settings in <code>.env.local</code>.</span>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-3">
          <User className="h-10 w-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-semibold text-slate-800">No student records found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">Get started by creating your first student entry in REP4 Connect.</p>
          <Link
            href="/students/add"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <Plus className="h-3.5 w-3.5" /> Register Student
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Student Name</th>
                <th className="px-6 py-3.5">School</th>
                <th className="px-6 py-3.5">Education Level</th>
                <th className="px-6 py-3.5">Cohort</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {s.firstName} {s.lastName}
                    <span className="block text-xs font-normal text-slate-400">{s.email}</span>
                  </td>
                  <td className="px-6 py-4">{s.school}</td>
                  <td className="px-6 py-4">{s.educationLevel}</td>
                  <td className="px-6 py-4 font-medium">{s.cohort}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/students/${s.id}`}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      View Profile →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}