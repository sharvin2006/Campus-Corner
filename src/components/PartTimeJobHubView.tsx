import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Plus, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  Building2, 
  Send, 
  X,
  Award
} from 'lucide-react';
import { JobListing, User } from '../types';

interface PartTimeJobHubViewProps {
  jobs: JobListing[];
  currentUser: User;
  onApplyJob: (jobId: string, pitch: string) => void;
  onPostJob: (newJob: JobListing) => void;
}

export const PartTimeJobHubView: React.FC<PartTimeJobHubViewProps> = ({
  jobs,
  currentUser,
  onApplyJob,
  onPostJob,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [applyingJob, setApplyingJob] = useState<JobListing | null>(null);
  const [applicationPitch, setApplicationPitch] = useState<string>('');
  const [isAppliedSuccess, setIsAppliedSuccess] = useState<boolean>(false);

  // Post Job Modal State
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newEmployer, setNewEmployer] = useState('');
  const [newCategory, setNewCategory] = useState<JobListing['category']>('Cafe/Food');
  const [newHourlyWage, setNewHourlyWage] = useState('8.50');
  const [newWorkingHours, setNewWorkingHours] = useState('4 hours/day (Flexi shifts)');
  const [newLocation, setNewLocation] = useState('PSAS Student Centre');
  const [newDescription, setNewDescription] = useState('');
  const [newRequirements, setNewRequirements] = useState('PSAS Student ID required, Friendly & Punctual');
  const [newContactPerson, setNewContactPerson] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  const filteredJobs = jobs.filter((job) => {
    const matchesCategory =
      selectedCategory === 'All' || job.category === selectedCategory;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.employer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingJob) return;
    onApplyJob(applyingJob.id, applicationPitch);
    setIsAppliedSuccess(true);
    setTimeout(() => {
      setIsAppliedSuccess(false);
      setApplyingJob(null);
      setApplicationPitch('');
    }, 1800);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newEmployer) return;

    const createdJob: JobListing = {
      id: `job_${Date.now()}`,
      title: newTitle,
      employer: newEmployer,
      employerVerified: true,
      category: newCategory,
      hourlyWage: parseFloat(newHourlyWage) || 8,
      payRate: `RM ${parseFloat(newHourlyWage).toFixed(2)} / hour`,
      workingHours: newWorkingHours,
      location: newLocation,
      description: newDescription || 'Flexible campus part-time job for polytechnic students.',
      requirements: newRequirements.split(',').map((r) => r.trim()),
      sdgBadge: 'SDG 8: Decent Work & Economic Growth',
      contactPerson: newContactPerson || currentUser.name,
      contactPhone: newContactPhone || currentUser.phone || '012-3456789',
      postedDate: 'Just now',
    };

    onPostJob(createdJob);
    setIsPostModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewEmployer('');
    setNewDescription('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. Header Banner: SDG 8 & Campus Job Hub Purpose */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-md border border-indigo-900/50">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold backdrop-blur-xs">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>SDG 8: Decent Work & Economic Growth</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              Verified Campus Employers Only
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-indigo-400 shrink-0" />
            <span>Campus Part-Time Job Hub ⭐</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Earn extra income between classes without leaving the PSAS campus! Browse flexible part-time shifts at PolyCafe, Koperasi, Faculty Offices, and Campus Career Events.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Post a Campus Job Vacancy</span>
            </button>
            <div className="text-xs text-indigo-200 font-medium flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Average Wage: RM8 - RM12 / Hour</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Controls & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search PolyCafe, Koperasi, Lecturer Assistant, Event Crew..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {['All', 'Cafe/Food', 'Retail/Promoter', 'Academic/Assistant', 'Event Crew'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Job Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.length === 0 ? (
          <div className="col-span-full bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
            <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No job vacancies found matching your search</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-1.5 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-xl hover:bg-indigo-100 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-indigo-300 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Header Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2.5 py-0.5 rounded-full inline-block">
                      {job.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {job.title}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-200/80 inline-block">
                      {job.payRate}
                    </span>
                  </div>
                </div>

                {/* Employer & Verification */}
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Building2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{job.employer}</span>
                  {job.employerVerified && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3 text-emerald-600 inline" />
                      Verified Employer
                    </span>
                  )}
                </div>

                {/* Details Pills */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span className="truncate">{job.workingHours}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                {/* Requirements */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.requirements.map((req, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md"
                    >
                      • {req}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="text-[10px] text-slate-400 font-medium">
                  Posted {job.postedDate}
                </span>

                <button
                  onClick={() => setApplyingJob(job)}
                  disabled={job.applied}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    job.applied
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  }`}
                >
                  {job.applied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Applied</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Quick Apply</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* 4. Quick Apply Modal */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Express Student Application</h3>
                  <p className="text-xs text-slate-500">{applyingJob.title}</p>
                </div>
              </div>
              <button
                onClick={() => setApplyingJob(null)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isAppliedSuccess ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-bold text-slate-900 text-base">Application Submitted!</h4>
                <p className="text-xs text-slate-600">
                  Your student status ({currentUser.studentId} - {currentUser.course}) has been submitted to {applyingJob.employer}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-800">Applicant Info:</div>
                  <div className="text-slate-600">
                    {currentUser.name} ({currentUser.studentId}) • {currentUser.department}
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    Phone: {currentUser.phone || '012-8849201'} | Email: {currentUser.email}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Short Pitch / Available Class Timetable (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Free on Monday & Wednesday afternoons after 2 PM. Punctual and hardworking!"
                    value={applicationPitch}
                    onChange={(e) => setApplicationPitch(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setApplyingJob(null)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* 5. Post Job Vacancy Modal */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-600" />
                <span>Post Campus Job Vacancy</span>
              </h3>
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Job Title *</label>
                <input
                  type="text"
                  placeholder="e.g. PolyCafe Counter Helper / Koperasi Cashier"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Employer Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. PolyCafe / Commerce Dept"
                    value={newEmployer}
                    onChange={(e) => setNewEmployer(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Cafe/Food">Cafe/Food</option>
                    <option value="Retail/Promoter">Retail/Promoter</option>
                    <option value="Academic/Assistant">Academic/Assistant</option>
                    <option value="Event Crew">Event Crew</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Hourly Wage (RM)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newHourlyWage}
                    onChange={(e) => setNewHourlyWage(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Location on Campus</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Working Hours / Shift</label>
                <input
                  type="text"
                  value={newWorkingHours}
                  onChange={(e) => setNewWorkingHours(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Job Description</label>
                <textarea
                  rows={2}
                  placeholder="Duties and expectations..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Publish Job Vacancy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
