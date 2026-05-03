import { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Filter,
  Download,
  TrendingUp,
  PhoneCall,
  Building2,
  X,
  MessageSquare,
  Globe,
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

export default function Leads() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterDiscoveryCall, setFilterDiscoveryCall] = useState<string>("all");

  // Modal State
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const fetchLeads = async () => {
    try {
      const response = await axios.get(
        "https://y-r-soft-consulting-back.vercel.app/leads",
      );
      setLeads(response.data);
      setFilteredLeads(response.data);
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

  useEffect(() => {
    let filtered = [...leads];

    if (filterType !== "all") {
      filtered = filtered.filter((lead) => lead.lead_type === filterType);
    }

    if (filterDiscoveryCall === "yes") {
      filtered = filtered.filter((lead) => lead.discovery_call === true);
    } else if (filterDiscoveryCall === "no") {
      filtered = filtered.filter((lead) => lead.discovery_call === false);
    }

    setFilteredLeads(filtered);
  }, [filterType, filterDiscoveryCall, leads]);

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Lead Type",
      "Name",
      "Email",
      "Phone",
      "Company",
      "Service",
      "Contact Method",
      "Discovery Call",
      "Created At",
    ];

    const csvData = filteredLeads.map((lead) => [
      lead.id,
      lead.lead_type,
      lead.name,
      lead.email,
      `${lead.country_code} ${lead.phone}`,
      lead.company || "-",
      lead.service,
      lead.contact_method,
      lead.discovery_call ? "Yes" : "No",
      new Date(lead.created_at).toLocaleDateString(),
    ]);

    const csv = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  // Calculate Statistics
  const totalLeads = leads.length;
  const discoveryCalls = leads.filter((l) => l.discovery_call).length;
  const companiesCount = leads.filter(
    (l) => l.company && l.company.trim() !== "",
  ).length;
  const digitalLeadsCount = leads.filter(
    (l) => l.lead_type === "Digital-Lead",
  ).length;

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
              <Users className="w-10 h-10 text-cyan-600" />
              Leads Management
            </h1>
            <p className="text-slate-500 mt-2 text-lg">
              View, filter, and manage all incoming leads from your website
              forms.
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Leads
                </p>
                <h3 className="text-2xl font-bold text-slate-900">
                  {totalLeads}
                </h3>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="p-4 bg-cyan-50 text-cyan-600 rounded-xl">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Digital Leads
                </p>
                <h3 className="text-2xl font-bold text-slate-900">
                  {digitalLeadsCount}
                </h3>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="p-4 bg-green-50 text-green-600 rounded-xl">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Discovery Calls
                </p>
                <h3 className="text-2xl font-bold text-slate-900">
                  {discoveryCalls}
                </h3>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="p-4 bg-purple-50 text-purple-600 rounded-xl">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Companies</p>
                <h3 className="text-2xl font-bold text-slate-900">
                  {companiesCount}
                </h3>
              </div>
            </div>
          </div>

          {/* Filters & Actions Bar */}
          <div className="bg-white shadow-sm rounded-2xl p-5 border border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                <Filter className="w-5 h-5 text-slate-400" />
                <span className="text-sm font-medium text-slate-600 mr-2">
                  Filters:
                </span>

                {/* Lead Type Filter */}
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer text-slate-700"
                >
                  <option value="all">All Types</option>
                  {Array.from(new Set(leads.map((l) => l.lead_type))).map(
                    (type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ),
                  )}
                </select>

                <span className="text-slate-300">|</span>

                {/* Discovery Call Filter */}
                <select
                  value={filterDiscoveryCall}
                  onChange={(e) => setFilterDiscoveryCall(e.target.value)}
                  className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer text-slate-700"
                >
                  <option value="all">All Calls</option>
                  <option value="yes">Calls: Yes</option>
                  <option value="no">Calls: No</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-xl hover:bg-slate-900 transition-all font-medium text-sm shadow-sm"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button
                onClick={fetchLeads}
                className="bg-cyan-600 text-white px-5 py-2.5 rounded-xl hover:bg-cyan-700 transition-all font-medium text-sm shadow-sm"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white shadow-lg shadow-slate-200/40 rounded-2xl overflow-hidden border border-slate-100">
            <div className="p-6 border-b border-slate-100 bg-white/50 backdrop-blur-sm">
              <h2 className="text-lg font-bold text-slate-800">
                {filterType === "all" && filterDiscoveryCall === "all"
                  ? `All Leads Directory (${filteredLeads.length})`
                  : `Filtered Results (${filteredLeads.length} of ${leads.length})`}
              </h2>
            </div>

            {loading ? (
              <div className="p-16 flex flex-col items-center justify-center text-slate-400">
                <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="font-medium">Loading your leads...</p>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="p-16 text-center text-slate-500 font-medium">
                No leads found matching your current filters.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-6 py-4 border-b border-slate-100">
                        Lead
                      </th>
                      <th className="px-6 py-4 border-b border-slate-100">
                        Type
                      </th>
                      <th className="px-6 py-4 border-b border-slate-100">
                        Contact Info
                      </th>
                      <th className="px-6 py-4 border-b border-slate-100">
                        Service / Company
                      </th>
                      <th className="px-6 py-4 border-b border-slate-100">
                        Discovery
                      </th>
                      <th className="px-6 py-4 border-b border-slate-100">
                        Date
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-50">
                    {filteredLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="hover:bg-cyan-50/50 transition-colors cursor-pointer group"
                      >
                        {/* Name & ID */}
                        <td className="px-6 py-5">
                          <div className="font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                            {lead.name}
                          </div>
                          <div className="text-xs font-mono text-slate-400 mt-1">
                            #{lead.id}
                          </div>
                        </td>

                        {/* Lead Type Badge */}
                        <td className="px-6 py-5">
                          <span
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 ${
                              lead.lead_type === "Digital-Lead"
                                ? "bg-cyan-100 text-cyan-800"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${lead.lead_type === "Digital-Lead" ? "bg-cyan-500" : "bg-slate-400"}`}
                            ></span>
                            {lead.lead_type}
                          </span>
                        </td>

                        {/* Contact */}
                        <td className="px-6 py-5">
                          <div className="flex flex-col gap-2 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-slate-400" />
                              <span className="truncate max-w-[200px]">
                                {lead.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-slate-400" />
                              <span>
                                {lead.country_code} {lead.phone}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Service & Company */}
                        <td className="px-6 py-5">
                          <div className="flex flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2 text-slate-800 font-medium">
                              <Briefcase className="w-4 h-4 text-cyan-600" />
                              {lead.service}
                            </div>
                            <div className="flex items-center gap-2 text-slate-500">
                              <Building2 className="w-4 h-4 text-slate-400" />
                              {lead.company || (
                                <span className="italic">No company</span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Discovery Call */}
                        <td className="px-6 py-5">
                          {lead.discovery_call ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-bold border border-green-100">
                              <Phone className="w-3.5 h-3.5" /> Yes
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1.5 bg-slate-50 text-slate-500 rounded-lg text-xs font-medium border border-slate-100">
                              No
                            </span>
                          )}
                        </td>

                        {/* Date */}
                        <td className="px-6 py-5 text-sm text-slate-500 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            {new Date(lead.created_at).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LEAD DETAILS MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {selectedLead.name}
                  </h2>
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      selectedLead.lead_type === "Digital-Lead"
                        ? "bg-cyan-100 text-cyan-800"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {selectedLead.lead_type}
                  </span>
                </div>
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Received on{" "}
                  {new Date(selectedLead.created_at).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-colors border border-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Contact Info Column */}
                <div className="space-y-5">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Contact Details
                  </h3>
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <Mail className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">
                        Email Address
                      </p>
                      <a
                        href={`mailto:${selectedLead.email}`}
                        className="font-medium hover:text-cyan-600 transition-colors"
                      >
                        {selectedLead.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <Phone className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">
                        Phone Number
                      </p>
                      <a
                        href={`tel:${selectedLead.country_code}${selectedLead.phone}`}
                        className="font-medium hover:text-cyan-600 transition-colors"
                      >
                        {selectedLead.country_code} {selectedLead.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <Users className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">
                        Preferred Contact
                      </p>
                      <p className="font-medium capitalize">
                        {selectedLead.contact_method}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Project Info Column */}
                <div className="space-y-5">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Project Request
                  </h3>
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <Briefcase className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">
                        Service Requested
                      </p>
                      <p className="font-medium">{selectedLead.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <Building2 className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">
                        Company Name
                      </p>
                      <p className="font-medium">
                        {selectedLead.company || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <PhoneCall className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">
                        Discovery Call
                      </p>
                      <p
                        className={`font-medium ${selectedLead.discovery_call ? "text-green-600" : "text-slate-500"}`}
                      >
                        {selectedLead.discovery_call
                          ? "Requested"
                          : "Not Requested"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Section (The Fancy Dashed Border part) */}
              <div className="mt-8">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Client Message
                </h3>
                <div className="relative">
                  {/* Decorative quotes mark */}
                  <span className="absolute -top-3 -left-2 text-4xl text-cyan-200/50 font-serif leading-none select-none">
                    "
                  </span>
                  <div className="bg-gradient-to-br from-cyan-50/50 to-white border-2 border-dashed border-cyan-200 rounded-2xl p-6 shadow-sm relative z-10">
                    {selectedLead.message ? (
                      <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {selectedLead.message}
                      </p>
                    ) : (
                      <p className="text-slate-400 italic text-center py-4">
                        No additional message was provided by the lead.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <a
                href={`mailto:${selectedLead.email}`}
                className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-xl transition-colors shadow-sm flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Reply to Lead
              </a>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium rounded-xl transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
