import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Users,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  Briefcase,
  BarChart3,
  PieChart,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

interface Lead {
  id: number;
  lead_type: string;
  name: string;
  email: string;
  country_code: string;
  phone: string;
  company?: string;
  service: string;
  message?: string;
  contact_method: string;
  discovery_call: boolean;
  created_at: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [rawLeads, setRawLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // Default to the current year
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );

  const fetchLeads = async () => {
    try {
      const response = await axios.get(
        "https://y-r-soft-consulting-back.vercel.app/leads",
      );
      setRawLeads(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchLeads();
  }, [navigate]);

  // Extract available years for the dropdown
  const availableYears = useMemo(() => {
    if (!rawLeads.length) return [new Date().getFullYear()];
    const years = rawLeads.map((l) => new Date(l.created_at).getFullYear());
    return Array.from(new Set(years)).sort((a, b) => b - a); // Sort descending
  }, [rawLeads]);

  // Calculate statistics dynamically based on rawLeads and selectedYear
  const stats = useMemo(() => {
    if (!rawLeads.length) return null;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    // 1. Global Metrics (Unaffected by Year Filter)
    const totalLeads = rawLeads.length;
    const leadsThisMonth = rawLeads.filter(
      (l) => new Date(l.created_at) >= startOfMonth,
    ).length;
    const leadsThisWeek = rawLeads.filter(
      (l) => new Date(l.created_at) >= startOfWeek,
    ).length;

    // 2. Year-Filtered Metrics (For charts and breakdowns)
    const yearLeads = rawLeads.filter(
      (l) => new Date(l.created_at).getFullYear() === selectedYear,
    );
    const discoveryCallsRequested = yearLeads.filter(
      (l) => l.discovery_call,
    ).length;

    // Breakdowns
    const serviceBreakdown: { [key: string]: number } = {};
    const contactMethodBreakdown: { [key: string]: number } = {};
    const leadTypeBreakdown: { [key: string]: number } = {};

    yearLeads.forEach((lead) => {
      serviceBreakdown[lead.service] =
        (serviceBreakdown[lead.service] || 0) + 1;
      contactMethodBreakdown[lead.contact_method] =
        (contactMethodBreakdown[lead.contact_method] || 0) + 1;
      leadTypeBreakdown[lead.lead_type] =
        (leadTypeBreakdown[lead.lead_type] || 0) + 1;
    });

    // 3. Fixed Monthly Trend (All 12 months for the selected year)
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthlyTrend = months.map((monthName, index) => {
      const count = yearLeads.filter(
        (lead) => new Date(lead.created_at).getMonth() === index,
      ).length;
      return { month: monthName, count };
    });

    // Get 5 most recent leads overall
    const recentLeads = [...rawLeads]
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      .slice(0, 5);

    return {
      totalLeads,
      leadsThisMonth,
      leadsThisWeek,
      yearTotal: yearLeads.length,
      discoveryCallsRequested,
      serviceBreakdown,
      contactMethodBreakdown,
      leadTypeBreakdown,
      recentLeads,
      monthlyTrend,
    };
  }, [rawLeads, selectedYear]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-400">
        <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-medium">Loading your dashboard...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500 font-medium bg-white px-8 py-4 rounded-xl shadow-sm border border-slate-100">
          No lead data available yet.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navigation />

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header & Year Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
              <BarChart3 className="w-10 h-10 text-cyan-600" />
              Dashboard
            </h1>
            <p className="text-slate-500 mt-2 text-lg">
              Overview of your leads and business metrics
            </p>
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
            <Filter className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-medium text-slate-600 mr-2">
              Filter Year:
            </span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-transparent text-sm font-bold text-cyan-700 focus:outline-none cursor-pointer"
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Leads (All Time) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Total Leads (All Time)
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {stats.totalLeads}
                </p>
              </div>
              <div className="bg-cyan-50 p-3 rounded-xl">
                <Users className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-cyan-500 mr-1" />
              <span className="text-cyan-600 font-medium">Lifetime</span>
            </div>
          </div>

          {/* This Month */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Leads This Month
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {stats.leadsThisMonth}
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Clock className="w-4 h-4 text-slate-400 mr-1" />
              <span className="text-slate-500">Current calendar month</span>
            </div>
          </div>

          {/* This Week */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Leads This Week
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {stats.leadsThisWeek}
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Clock className="w-4 h-4 text-slate-400 mr-1" />
              <span className="text-slate-500">Last 7 days</span>
            </div>
          </div>

          {/* Discovery Calls (For Selected Year) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Discovery Calls ({selectedYear})
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {stats.discoveryCallsRequested}
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Phone className="w-4 h-4 text-slate-400 mr-1" />
              <span className="text-slate-500">
                {stats.yearTotal > 0
                  ? Math.round(
                      (stats.discoveryCallsRequested / stats.yearTotal) * 100,
                    )
                  : 0}
                % of {selectedYear} leads
              </span>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Monthly Trend - Takes up 2 columns */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-600" />
                Monthly Trend ({selectedYear})
              </h3>
              <span className="text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1 rounded-lg">
                Total: {stats.yearTotal}
              </span>
            </div>

            <div className="h-64 flex items-end justify-between gap-2 mt-4">
              {stats.monthlyTrend.map((item, index) => {
                const maxCount = Math.max(
                  ...stats.monthlyTrend.map((m) => m.count),
                );
                const height = maxCount > 0 ? (item.count / maxCount) * 100 : 0;

                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center group h-full justify-end"
                  >
                    <div className="w-full relative flex flex-col justify-end items-center h-[90%]">
                      {/* Tooltip */}
                      <div className="absolute -top-10 bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        {item.count} leads
                      </div>

                      {/* Bar */}
                      <div
                        className="w-full max-w-[40px] bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-md hover:from-cyan-500 hover:to-cyan-300 transition-all duration-300 cursor-pointer shadow-sm"
                        style={{ height: `${height}%`, minHeight: "4px" }}
                      ></div>
                    </div>
                    <p className="text-xs font-medium text-slate-500 mt-3 group-hover:text-cyan-600 transition-colors">
                      {item.month}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Service Breakdown */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-600" />
              Services ({selectedYear})
            </h3>
            <div className="space-y-5">
              {Object.keys(stats.serviceBreakdown).length === 0 ? (
                <p className="text-slate-400 text-sm italic text-center py-4">
                  No data for {selectedYear}
                </p>
              ) : (
                Object.entries(stats.serviceBreakdown)
                  .sort(([, a], [, b]) => b - a)
                  .map(([service, count], index) => {
                    const percentage =
                      stats.yearTotal > 0
                        ? Math.round((count / stats.yearTotal) * 100)
                        : 0;
                    const colors = [
                      "bg-cyan-500",
                      "bg-purple-500",
                      "bg-blue-500",
                      "bg-pink-500",
                      "bg-orange-500",
                    ];
                    const barColor = colors[index % colors.length];

                    return (
                      <div key={service} className="group">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-sm font-medium text-slate-700 truncate pr-2">
                            {service}
                          </span>
                          <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded">
                            {count} ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`${barColor} h-full rounded-full transition-all duration-1000 ease-out group-hover:brightness-110`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lead Types */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-cyan-600" />
              Lead Types ({selectedYear})
            </h3>
            <div className="space-y-3">
              {Object.keys(stats.leadTypeBreakdown).length === 0 && (
                <p className="text-slate-400 text-sm italic text-center py-4">
                  No data
                </p>
              )}
              {Object.entries(stats.leadTypeBreakdown).map(([type, count]) => {
                const percentage =
                  stats.yearTotal > 0
                    ? Math.round((count / stats.yearTotal) * 100)
                    : 0;
                return (
                  <div
                    key={type}
                    className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-100/50"
                  >
                    <span className="text-sm font-bold text-slate-700">
                      {type}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-slate-900">
                        {count}
                      </span>
                      <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-1 rounded-md">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Methods */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
              <Mail className="w-5 h-5 text-cyan-600" />
              Contact Methods ({selectedYear})
            </h3>
            <div className="space-y-3">
              {Object.keys(stats.contactMethodBreakdown).length === 0 && (
                <p className="text-slate-400 text-sm italic text-center py-4">
                  No data
                </p>
              )}
              {Object.entries(stats.contactMethodBreakdown).map(
                ([method, count]) => {
                  const percentage =
                    stats.yearTotal > 0
                      ? Math.round((count / stats.yearTotal) * 100)
                      : 0;
                  return (
                    <div
                      key={method}
                      className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-100/50"
                    >
                      <span className="text-sm font-bold text-slate-700 capitalize">
                        {method}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-900">
                          {count}
                        </span>
                        <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-1 rounded-md">
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>

          {/* Recent Leads (Global/All-Time) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-600" />
                Recent Leads
              </h3>
              <button
                onClick={() => navigate("/leads")}
                className="text-sm text-cyan-600 hover:text-cyan-700 font-bold bg-cyan-50 hover:bg-cyan-100 px-3 py-1.5 rounded-lg transition-colors"
              >
                View All
              </button>
            </div>
            <div className="space-y-3 flex-1">
              {stats.recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-100/50 group cursor-pointer"
                  onClick={() => navigate("/leads")}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 truncate pr-2">
                      <p className="font-bold text-slate-900 text-sm group-hover:text-cyan-600 transition-colors truncate">
                        {lead.name}
                      </p>
                      <p className="text-xs font-medium text-slate-500 mt-0.5 truncate">
                        {lead.service}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shrink-0 ${
                        lead.discovery_call
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {lead.discovery_call ? "Call" : "No Call"}
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-slate-400 mt-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(lead.created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
