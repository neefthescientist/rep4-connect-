'use client';

import Link from 'next/link';
import { Users, BookOpen, FolderKanban, Award, Plus, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-indigo-900 text-white p-6 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold">Welcome to REP4 Connect</h1>
          <p className="text-indigo-200 text-sm mt-1">Student Data & DevOps Program Management Platform</p>
        </div>
        <Link
          href="/students/add"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors w-fit"
        >
          <Plus className="h-4 w-4" /> Add New Student
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Students', value: '248', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { title: 'Active Programs', value: '12', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { title: 'Active Projects', value: '14', icon: FolderKanban, color: 'text-amber-600', bg: 'bg-amber-50' },
          { title: 'Total Hours', value: '1,420 hrs', icon: Award, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">{metric.title}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{metric.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${metric.bg}`}>
                <Icon className={`h-6 w-6 ${metric.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/students" className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-500 transition-colors">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 flex items-center justify-between">
            Student Database <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs text-slate-500 mt-2">Search records, view individual participation timelines, and review status badges.</p>
        </Link>

        <Link href="/programs" className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-500 transition-colors">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 flex items-center justify-between">
            Programs <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs text-slate-500 mt-2">Track REP4 Summits, STEM workshops, and student enrollment metrics.</p>
        </Link>

        <Link href="/projects" className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-500 transition-colors">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 flex items-center justify-between">
            Projects <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs text-slate-500 mt-2">Manage active team assignments, smart farming setups, and software builds.</p>
        </Link>
      </div>
    </div>
  );
}