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

  const fetchLeads = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/leads");
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

    // Filter by lead type
    if (filterType !== "all") {
      filtered = filtered.filter((lead) => lead.lead_type === filterType);
    }

    // Filter by discovery call
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

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="w-8 h-8 text-cyan-600" />
            Leads Management
          </h1>
          <p className="text-gray-600 mt-2">
            View, filter, and manage all incoming leads from your website forms.
          </p>
        </div>

        {/* Filters & Actions Bar */}
        <div className="bg-white shadow-md rounded-xl p-4 mb-6 border border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-400" />

              {/* Lead Type Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
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

              {/* Discovery Call Filter */}
              <select
                value={filterDiscoveryCall}
                onChange={(e) => setFilterDiscoveryCall(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="all">All Calls</option>
                <option value="yes">Discovery Call: Yes</option>
                <option value="no">Discovery Call: No</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button
                onClick={fetchLeads}
                className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          {/* Table Header */}
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {filterType === "all" && filterDiscoveryCall === "all"
                ? `All Leads (${filteredLeads.length})`
                : `Filtered Leads (${filteredLeads.length} of ${leads.length})`}
            </h2>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="p-10 text-center text-gray-500">
              Loading leads...
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No leads found matching filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                  <tr>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Lead Type</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Company</th>
                    <th className="px-6 py-4">Discovery Call</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition">
                      {/* ID */}
                      <td className="px-6 py-4 text-gray-600 font-mono text-sm">
                        #{lead.id}
                      </td>

                      {/* Lead Type Badge */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            lead.lead_type === "Digital-Lead"
                              ? "bg-cyan-100 text-cyan-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {lead.lead_type}
                        </span>
                      </td>

                      {/* Name */}
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {lead.name}
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <a
                              href={`mailto:${lead.email}`}
                              className="text-cyan-600 hover:underline"
                            >
                              {lead.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <a
                              href={`tel:${lead.country_code}${lead.phone}`}
                              className="text-cyan-600 hover:underline"
                            >
                              {lead.country_code} {lead.phone}
                            </a>
                          </div>
                        </div>
                      </td>

                      {/* Service */}
                      <td className="px-6 py-4 text-gray-700">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          {lead.service}
                        </div>
                      </td>

                      {/* Company */}
                      <td className="px-6 py-4 text-gray-600">
                        {lead.company || "-"}
                      </td>

                      {/* Discovery Call */}
                      <td className="px-6 py-4">
                        {lead.discovery_call ? (
                          <span className="flex items-center gap-1 text-green-600 font-semibold">
                            <Phone className="w-4 h-4" />
                            Yes
                          </span>
                        ) : (
                          <span className="text-gray-400">No</span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {new Date(lead.created_at).toLocaleDateString()}
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
    </>
  );
}
