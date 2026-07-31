import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MousePointerClick, 
  MessageSquare, 
  ShoppingBag, 
  DollarSign, 
  Sparkles, 
  Loader2, 
  Send, 
  HelpCircle,
  BarChart2,
  PieChart
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  BarChart, 
  Bar, 
  Legend 
} from 'recharts';
import { CampaignAnalytics, User } from '../types';

interface CampaignAnalyticsViewProps {
  analytics: CampaignAnalytics;
  currentUser: User;
}

export const CampaignAnalyticsView: React.FC<CampaignAnalyticsViewProps> = ({
  analytics,
  currentUser,
}) => {
  const [aiQuestion, setAiQuestion] = useState('How can I increase my Tiramisu conversion rate on campus?');
  const [aiAdviceResult, setAiAdviceResult] = useState<string | null>(null);
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(false);

  const handleFetchAiAdvice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    setIsLoadingAdvice(true);
    setAiAdviceResult(null);

    try {
      const res = await fetch('/api/ai/marketing-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeName: analytics.storeName,
          campaignData: analytics,
          question: aiQuestion,
        }),
      });

      const data = await res.json();
      if (data?.advice) {
        setAiAdviceResult(data.advice);
      }
    } catch (err) {
      console.error('Failed to fetch AI marketing advice:', err);
    } finally {
      setIsLoadingAdvice(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-400/20 text-teal-300 text-xs font-bold border border-teal-400/30">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Exclusive Commerce Dept Feature</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Marketing Campaign & Conversion Analytics ⭐
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Track real digital marketing metrics for your student business store ({analytics.storeName}). Analyze visitor funnels, click-through rates, and conversion percentages for your Commerce assignments.
        </p>
      </div>

      {/* KPI Stat Cards (Visitors, Clicks, Inquiries, Sales, Conversion, Revenue) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Visitors</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-xl font-extrabold text-slate-900">{analytics.visitors}</div>
          <div className="text-[10px] text-emerald-600 font-semibold">↑ 14% vs last week</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Item Clicks</span>
            <MousePointerClick className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900">{analytics.clicks}</div>
          <div className="text-[10px] text-teal-600 font-semibold">28.9% CTR</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Chat Inquiries</span>
            <MessageSquare className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900">{analytics.messages}</div>
          <div className="text-[10px] text-emerald-600 font-semibold">7.3% Inquiry Rate</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Sales Closed</span>
            <ShoppingBag className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-emerald-700">{analytics.sales}</div>
          <div className="text-[10px] text-emerald-600 font-semibold">18 Units Sold</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-amber-800">
            <span className="text-[11px] font-extrabold">Conversion Rate</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-black text-amber-700">{analytics.conversionRate}%</div>
          <div className="text-[10px] text-amber-800 font-bold">Campus High Benchmark</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900">RM {analytics.revenue}</div>
          <div className="text-[10px] text-emerald-600 font-semibold">+RM 32 today</div>
        </div>

      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Daily Traffic & Sales Trend Line Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-600" />
              <span>Weekly Visitors & Sales Trend</span>
            </h3>
            <span className="text-[10px] text-slate-400">Past 7 Days</span>
          </div>

          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="visitors" stroke="#0d9488" strokeWidth={2} name="Daily Visitors" />
                <Line type="monotone" dataKey="sales" stroke="#16a34a" strokeWidth={3} name="Sales Units" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Product Performance Bar Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-teal-600" />
              <span>Top Product Clicks & Conversions</span>
            </h3>
            <span className="text-[10px] text-slate-400">By Product</span>
          </div>

          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip />
                <Bar dataKey="clicks" fill="#0d9488" name="Item Clicks" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revenue" fill="#15803d" name="Revenue (RM)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* AI Marketing Coach Widget ⭐⭐⭐⭐⭐ */}
      <div className="bg-gradient-to-r from-emerald-950 to-teal-900 rounded-2xl p-6 text-white shadow-lg space-y-4 border border-emerald-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">AI Marketing Advisor & Commerce Lecturer ⭐</h3>
              <p className="text-[11px] text-emerald-200">
                Ask how to improve pricing, increase conversion, or market to students using STP theory.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleFetchAiAdvice} className="flex gap-2">
          <input
            type="text"
            value={aiQuestion}
            onChange={(e) => setAiQuestion(e.target.value)}
            placeholder="Ask AI Lecturer (e.g. How to double sales during exam week?)..."
            className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-emerald-200/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button
            type="submit"
            disabled={isLoadingAdvice}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            {isLoadingAdvice ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>Ask Advisor</span>
          </button>
        </form>

        {aiAdviceResult && (
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-xs text-slate-100 leading-relaxed whitespace-pre-line animate-in fade-in duration-200">
            {aiAdviceResult}
          </div>
        )}
      </div>

    </div>
  );
};
