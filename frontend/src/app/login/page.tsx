'use client';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Sign In</h1>
        <p className="text-sm text-slate-500 mb-6">Welcome to REP4 Connect</p>
        <button
          onClick={() => window.location.href = '/students'}
          className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-500 transition-colors"
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
}
