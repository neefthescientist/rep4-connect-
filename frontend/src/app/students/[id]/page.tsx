'use client';

import Link from 'next/link';
import { ArrowLeft, User, Mail, School, Calendar, Award, CheckCircle2, Clock } from 'lucide-react';

export default function StudentProfilePage({ params }: { params: { id: string } }) {
  // Mock data representing a retrieved student record
  const student = {
    id: params.id,
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    school: 'Grand Valley High School',
    educationLevel: 'High School',
    gradYear: 2027,
    cohort: 2026,
    status: 'Active',
    totalHours: 28.5,
    interests: ['Robotics', 'Agricultural Tech', 'Web Development'],
    timeline: [
      { date: '2026-08-15', title: 'Completed Hydroponics Workshop', hours: 4.0, type: 'Program' },
      { date: '2026-07-20', title: 'Joined Smart Farming Project Team', hours: 12.5, type: 'Project' },
      { date: '2026-06-15', title: 'Attended REP4 Summer Summit', hours: 12.0, type: 'Summit' },
    ],
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link
          href="/students"
          className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{student.name}</h1>
          <p className="text-sm text-slate-500">Student Profile & Engagement Timeline</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-sm font-semibold uppercase text-slate-400">Personal Information</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-xs text-slate-400 block">Email</span>
              <span className="font-medium text-slate-800">{student.email}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">School</span>
              <span className="font-medium text-slate-800">{student.school}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Cohort / Grad Year</span>
              <span className="font-medium text-slate-800">{student.cohort} / {student.gradYear}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Status</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">
                {student.status}
              </span>
            </div>
          </div>
          <div>
            <span className="text-xs text-slate-400 block mb-1">Interests</span>
            <div className="flex flex-wrap gap-1.5">
              {student.interests.map((interest, i) => (
                <span key={i} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full font-medium">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase text-slate-400">Service Summary</h2>
            <div className="mt-4 text-center">
              <span className="text-4xl font-bold text-indigo-600">{student.totalHours}</span>
              <span className="text-sm text-slate-500 block mt-1">Total Verified Hours</span>
            </div>
          </div>
          <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded-lg text-xs transition-colors">
            Log New Hours
          </button>
        </div>
      </div>

      {/* Participation Timeline */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Participation Timeline</h2>
        <div className="relative border-l-2 border-slate-100 pl-6 space-y-6">
          {student.timeline.map((event, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[31px] top-1 bg-indigo-600 text-white rounded-full p-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800">{event.title}</h3>
                <span className="text-xs font-semibold text-slate-500">{event.hours} hrs</span>
              </div>
              <div className="flex gap-2 text-xs text-slate-400 mt-1">
                <span>{event.date}</span>
                <span>•</span>
                <span className="font-medium text-indigo-600">{event.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}