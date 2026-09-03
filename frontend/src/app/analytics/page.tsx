'use client';

import { BarChart3, Users, Award, TrendingUp, Calendar } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">REP4 Analytics & Reports</h1>
        <p className="text-sm text-slate-500">Overview of student growth, service hours, and cohort distribution.</p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Service Hours', value: '1,420 hrs', icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Avg Engagement Rate', value: '88%', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Active Projects', value: '14', icon: BarChart3, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Active Cohorts', value: '3 Years', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">{m.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{m.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${m.bg}`}>
                <Icon className={`h-6 w-6 ${m.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Distribution Breakdown Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-4">Students by Cohort Year</h3>
          <div className="space-y-3">
            {[
              { year: 'Cohort 2026', count: 114, percentage: '46%' },
              { year: 'Cohort 2025', count: 78, percentage: '31%' },
              { year: 'Cohort 2024', count: 56, percentage: '23%' },
            ].map((c, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-700">
                  <span>{c.year}</span>
                  <span>{c.count} students ({c.percentage})</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: c.percentage }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-4">Education Level Breakdown</h3>
          <div className="space-y-3">
            {[
              { level: 'High School', count: 162, percentage: '65%' },
              { level: 'Middle School', count: 48, percentage: '19%' },
              { level: 'College / University', count: 38, percentage: '16%' },
            ].map((e, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-700">
                  <span>{e.level}</span>
                  <span>{e.count} students ({e.percentage})</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: e.percentage }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}