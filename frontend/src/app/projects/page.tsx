'use client';

import { FolderKanban, Plus, Users, Calendar } from 'lucide-react';

const mockProjects = [
  {
    id: '1',
    name: 'Smart Hydroponics Tower',
    status: 'Active',
    lead: 'Dr. Marcus Vance',
    startDate: '2026-08-10',
    assignedStudents: 6,
    description: 'Automated nutrient monitoring system using IoT sensors and Node.js backend.',
  },
  {
    id: '2',
    name: 'Community Solar Kiosk',
    status: 'Planning',
    lead: 'Sarah Jenkins',
    startDate: '2026-10-01',
    assignedStudents: 4,
    description: 'Designing off-grid mobile charging stations for local community centers.',
  },
  {
    id: '3',
    name: 'REP4 Mobile Portal',
    status: 'Completed',
    lead: 'Alex Johnson',
    startDate: '2026-05-01',
    assignedStudents: 8,
    description: 'Initial student engagement web application rollout.',
  },
];

export default function ProjectsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Planning': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Project Tracking</h1>
          <p className="text-sm text-slate-500">Monitor active student projects and team assignments.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors">
          <Plus className="h-4 w-4" /> New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <div key={project.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(project.status)}`}>
                {project.status}
              </span>
              <span className="text-xs text-slate-400">Lead: {project.lead}</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{project.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{project.description}</p>
            </div>
            <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-slate-400" /> {project.assignedStudents} Students Assigned
              </span>
              <button className="text-indigo-600 hover:text-indigo-800 font-semibold">
                Edit Team →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}