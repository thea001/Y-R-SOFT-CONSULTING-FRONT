import { useEffect, useState } from "react";
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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import { div } from "motion/react-client";

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

interface DashboardStats {
  totalLeads: number;
  digitalLeads: number;
  discoveryCallsRequested: number;
  leadsThisMonth: number;
  leadsThisWeek: number;
  serviceBreakdown: { [key: string]: number };
  contactMethodBreakdown: { [key: string]: number };
  leadTypeBreakdown: { [key: string]: number };
  recentLeads: Lead[];
  monthlyTrend: { month: string; count: number }[];
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const calculateStats = (leads: Lead[]): DashboardStats => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    // Service breakdown
    const serviceBreakdown: { [key: string]: number } = {};
    const contactMethodBreakdown: { [key: string]: number } = {};
    const leadTypeBreakdown: { [key: string]: number } = {};

    leads.forEach((lead) => {
      // Service
      serviceBreakdown[lead.service] =
        (serviceBreakdown[lead.service] || 0) + 1;

      // Contact method
      contactMethodBreakdown[lead.contact_method] =
        (contactMethodBreakdown[lead.contact_method] || 0) + 1;

      // Lead type
      leadTypeBreakdown[lead.lead_type] =
        (leadTypeBreakdown[lead.lead_type] || 0) + 1;
    });

    // Monthly trend (last 6 months)
    const monthlyTrend = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString("en-US", { month: "short" });
      const count = leads.filter((lead) => {
        const leadDate = new Date(lead.created_at);
        return (
          leadDate.getMonth() === date.getMonth() &&
          leadDate.getFullYear() === date.getFullYear()
        );
      }).length;
      monthlyTrend.push({ month: monthName, count });
    }

    return {
      totalLeads: leads.length,
      digitalLeads: leads.filter((l) => l.lead_type === "Digital-Lead").length,
      discoveryCallsRequested: leads.filter((l) => l.discovery_call).length,
      leadsThisMonth: leads.filter(
        (l) => new Date(l.created_at) >= startOfMonth,
      ).length,
      leadsThisWeek: leads.filter((l) => new Date(l.created_at) >= startOfWeek)
        .length,
      serviceBreakdown,
      contactMethodBreakdown,
      leadTypeBreakdown,
      recentLeads: leads.slice(0, 5),
      monthlyTrend,
    };
  };

  const fetchLeads = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/leads");
      const calculatedStats = calculateStats(response.data);
      setStats(calculatedStats);
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
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading dashboard...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">No data available</div>
      </div>
    );
  }

  return (
    <div>
      <Navigation />

      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-cyan-600" />
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Overview of your leads and business metrics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Leads */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Leads</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.totalLeads}
                </p>
              </div>
              <div className="bg-cyan-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">All time</span>
            </div>
          </div>

          {/* This Month */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">This Month</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.leadsThisMonth}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Clock className="w-4 h-4 text-gray-400 mr-1" />
              <span className="text-gray-600">Last 30 days</span>
            </div>
          </div>

          {/* This Week */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">This Week</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.leadsThisWeek}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Clock className="w-4 h-4 text-gray-400 mr-1" />
              <span className="text-gray-600">Last 7 days</span>
            </div>
          </div>

          {/* Discovery Calls */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Discovery Calls
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.discoveryCallsRequested}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Phone className="w-4 h-4 text-gray-400 mr-1" />
              <span className="text-gray-600">
                {stats.totalLeads > 0
                  ? Math.round(
                      (stats.discoveryCallsRequested / stats.totalLeads) * 100,
                    )
                  : 0}
                % of total
              </span>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Trend */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-600" />
              Monthly Trend
            </h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {stats.monthlyTrend.map((item, index) => {
                const maxCount = Math.max(
                  ...stats.monthlyTrend.map((m) => m.count),
                );
                const height = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div className="w-full relative group">
                      <div
                        className="bg-cyan-500 rounded-t-lg w-full hover:bg-cyan-600 transition cursor-pointer"
                        style={{ height: `${height}%`, minHeight: "8px" }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                          {item.count} leads
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{item.month}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Service Breakdown */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-cyan-600" />
              Services Requested
            </h3>
            <div className="space-y-3">
              {Object.entries(stats.serviceBreakdown)
                .sort(([, a], [, b]) => b - a)
                .map(([service, count], index) => {
                  const percentage =
                    stats.totalLeads > 0
                      ? Math.round((count / stats.totalLeads) * 100)
                      : 0;
                  const colors = [
                    "bg-cyan-500",
                    "bg-blue-500",
                    "bg-purple-500",
                    "bg-pink-500",
                    "bg-orange-500",
                  ];
                  return (
                    <div key={service}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {service}
                        </span>
                        <span className="text-sm text-gray-600">
                          {count} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${
                            colors[index % colors.length]
                          } h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lead Types */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-cyan-600" />
              Lead Types
            </h3>
            <div className="space-y-3">
              {Object.entries(stats.leadTypeBreakdown).map(([type, count]) => {
                const percentage =
                  stats.totalLeads > 0
                    ? Math.round((count / stats.totalLeads) * 100)
                    : 0;
                return (
                  <div
                    key={type}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {type}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{count}</span>
                      <span className="text-xs text-gray-500">
                        ({percentage}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Methods */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-cyan-600" />
              Contact Methods
            </h3>
            <div className="space-y-3">
              {Object.entries(stats.contactMethodBreakdown).map(
                ([method, count]) => {
                  const percentage =
                    stats.totalLeads > 0
                      ? Math.round((count / stats.totalLeads) * 100)
                      : 0;
                  return (
                    <div
                      key={method}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {method}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{count}</span>
                        <span className="text-xs text-gray-500">
                          ({percentage}%)
                        </span>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>

          {/* Recent Leads */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-600" />
                Recent Leads
              </h3>
              <button
                onClick={() => navigate("/leads")}
                className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
              >
                View All →
              </button>
            </div>
            <div className="space-y-3">
              {stats.recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">
                        {lead.name}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {lead.service}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        lead.discovery_call
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {lead.discovery_call ? "Call" : "No Call"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(lead.created_at).toLocaleDateString()}
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
