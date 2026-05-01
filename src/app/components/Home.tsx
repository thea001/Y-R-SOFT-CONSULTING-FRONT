import {
  Building2,
  Globe,
  Scale,
  Shield,
  Users,
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle2,
  Linkedin,
  X,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";

export default function Home() {
  const [activeModal, setActiveModal] = useState<
    "digital" | "consulting" | null
  >(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactMethod, setContactMethod] = useState<"email" | "phone">(
    "email",
  );
  const [discoveryCall, setDiscoveryCall] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const data = {
      leadType: activeModal === "digital" ? "Digital-Lead" : "Consulting-Lead",
      name: formData.get("name"),
      email: formData.get("email"),
      countryCode: formData.get("countryCode"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      service: formData.get("service"),
      message: formData.get("message"),
      contactMethod: contactMethod,
      discoveryCall: discoveryCall,
    };

    try {
      await axios.post("http://127.0.0.1:8000/leads", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setIsSubmitted(false);
    setContactMethod("email");
    setDiscoveryCall(false);
  };

  const switchToDigital = () => {
    setIsSubmitted(false);
    setContactMethod("email");
    setDiscoveryCall(false);
    setActiveModal("digital");
  };

  const switchToConsulting = () => {
    setIsSubmitted(false);
    setContactMethod("email");
    setDiscoveryCall(false);
    setActiveModal("consulting");
  };

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Navigation Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <nav className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex-1"></div>
            <div className="flex items-center justify-center gap-8">
              <a
                href="#home"
                className="text-white hover:text-gray-200 transition-colors"
              >
                Home
              </a>
              <a
                href="#services"
                className="text-white hover:text-gray-200 transition-colors"
              >
                Services
              </a>
              <div className="mx-4">
                <h1 className="text-2xl font-bold text-white tracking-wider">
                  Y.R SOFT CONSULTING
                </h1>
              </div>
              <Link
                to="/blog"
                className="text-white hover:text-gray-200 transition-colors"
              >
                Blog
              </Link>
              <a
                href="#contact"
                className="text-white hover:text-gray-200 transition-colors"
              >
                Contact
              </a>
            </div>
            <div className="flex-1"></div>
          </div>
        </nav>
      </header>

      {/* Hero Section - Split Screen */}
      <section id="home" className="relative h-screen flex">
        {/* Left Side - Digital Solutions */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1615494937408-7f4e41bf45d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBzY3JlZW4lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MTc2MTA5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-90"></div>
          <div className="relative z-10 text-center px-8">
            <Globe className="w-20 h-20 text-white mx-auto mb-6" />
            <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
              DIGITAL
              <br />
              SOLUTIONS
            </h2>
            <p className="text-white text-lg mb-8 max-w-md mx-auto">
              Transform your business with cutting-edge web development and
              digital strategies
            </p>
            <button
              className="bg-white text-cyan-600 px-10 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
              onClick={switchToDigital}
            >
              Boost my Visibility
            </button>
          </div>
        </div>

        {/* Middle Divider */}
        <div className="w-1 bg-white z-20"></div>

        {/* Right Side - Strategic Consulting */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1758448511255-ac2a24a135d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBvZmZpY2UlMjBleGVjdXRpdmV8ZW58MXx8fHwxNzcxNzYxMDk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-bl from-slate-800 to-slate-900 opacity-90"></div>
          <div className="relative z-10 text-center px-8">
            <Scale className="w-20 h-20 text-white mx-auto mb-6" />
            <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
              STRATEGIC
              <br />
              CONSULTING
            </h2>
            <p className="text-white text-lg mb-8 max-w-md mx-auto">
              Expert legal guidance and business consulting for sustainable
              growth
            </p>
            <button
              className="bg-white text-slate-800 px-10 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
              onClick={switchToConsulting}
            >
              Secure my Business
            </button>
          </div>
        </div>
      </section>

      {/* One-Stop Shop Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your One-Stop Shop
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combining legal expertise with digital innovation to provide
              comprehensive business solutions under one roof
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-cyan-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Legal + Digital
              </h3>
              <p className="text-gray-600">
                Seamlessly integrate legal compliance with modern digital
                strategies for complete business protection
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Secure & Scalable
              </h3>
              <p className="text-gray-600">
                Build a strong foundation with robust legal structures and
                scalable digital infrastructure
              </p>
            </div>

            <div className="text-center">
              <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Growth Focused
              </h3>
              <p className="text-gray-600">
                Strategic consulting designed to accelerate your business growth
                while maintaining compliance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Company Formation */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-cyan-500 transition-all hover:shadow-xl">
              <div className="bg-cyan-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Company Formation
              </h3>
              <p className="text-gray-600 mb-6">
                Complete support for establishing your business entity with full
                legal compliance and documentation
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Business structure consulting
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Registration & licensing
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Legal documentation</span>
                </li>
              </ul>
            </div>

            {/* Domiciliation */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-500 transition-all hover:shadow-xl">
              <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Domiciliation
              </h3>
              <p className="text-gray-600 mb-6">
                Professional business address and administrative services to
                enhance your corporate presence
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Premium business address
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Mail handling services</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Administrative support</span>
                </li>
              </ul>
            </div>

            {/* Custom Web Development */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-slate-500 transition-all hover:shadow-xl">
              <div className="bg-slate-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Custom Web Dev
              </h3>
              <p className="text-gray-600 mb-6">
                Bespoke web solutions built with modern technologies to elevate
                your digital presence
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Responsive web design</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">E-commerce platforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Custom applications</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Leading Companies
            </h2>
            <p className="text-xl text-gray-300">
              Delivering excellence since 2016
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto mb-16">
            <div className="text-center">
              <div className="bg-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-5xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-300">Companies Served</div>
            </div>

            <div className="text-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-5xl font-bold text-white mb-2">10+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>

            <div className="text-center">
              <div className="bg-slate-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="text-5xl font-bold text-white mb-2">100%</div>
              <div className="text-gray-300">Client Satisfaction</div>
            </div>
          </div>

          {/* Client Logos Placeholder */}
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div className="w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div className="w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
              <Scale className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-950 text-gray-300 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">
                Y.R SOFT CONSULTING
              </h3>
              <p className="text-gray-400 mb-6">
                Your trusted partner for digital innovation and strategic
                business consulting
              </p>
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-semibold mb-1">Tunis Office</p>
                  <p className="text-gray-400">
                    Centre Urbain Nord
                    <br />
                    1082 Tunis, Tunisia
                  </p>
                </div>
              </div>
            </div>

            {/* Sitemap */}
            <div>
              <h4 className="text-white font-semibold mb-4">Sitemap</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">
              © 2026 Y.R SOFT CONSULTING. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal Overlay for Digital Solutions Form */}
      {activeModal === "digital" && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {!isSubmitted ? (
              <>
                {/* Header with Cyan accent */}
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-8 text-white sticky top-0 z-10">
                  <button
                    className="absolute top-6 right-6 text-white hover:text-gray-200 transition-colors"
                    onClick={closeModal}
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <Globe className="w-12 h-12 mb-4" />
                  <h3 className="text-3xl font-bold mb-2">
                    Start your Digital Transformation
                  </h3>
                  <p className="text-cyan-50">
                    Let's build your online presence together
                  </p>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-8">
                  <div className="space-y-5">
                    {/* Name Field */}
                    <div>
                      <label
                        className="block text-gray-700 font-semibold mb-2"
                        htmlFor="digital-name"
                      >
                        Name *
                      </label>
                      <input
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                        id="digital-name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    {/* Business Email */}
                    <div>
                      <label
                        className="block text-gray-700 font-semibold mb-2"
                        htmlFor="digital-email"
                      >
                        Business Email *
                      </label>
                      <input
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                        id="digital-email"
                        name="email"
                        type="email"
                        placeholder="john@company.com"
                        required
                      />
                    </div>

                    {/* Phone Number with Country Code */}
                    <div>
                      <label
                        className="block text-gray-700 font-semibold mb-2"
                        htmlFor="digital-phone"
                      >
                        Phone Number *
                      </label>
                      <div className="flex gap-2">
                        <select
                          className="px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors bg-white"
                          name="countryCode"
                          defaultValue="+216"
                        >
                          <option value="+216">🇹🇳 +216</option>
                          <option value="+213">🇩🇿 +213</option>
                          <option value="+212">🇲🇦 +212</option>
                          <option value="+33">🇫🇷 +33</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                        </select>
                        <input
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                          id="digital-phone"
                          name="phone"
                          type="tel"
                          placeholder="XX XXX XXX"
                          required
                        />
                      </div>
                    </div>

                    {/* Company Name */}
                    <div>
                      <label
                        className="block text-gray-700 font-semibold mb-2"
                        htmlFor="digital-company"
                      >
                        Company Name *
                      </label>
                      <input
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                        id="digital-company"
                        name="company"
                        type="text"
                        placeholder="Your Company Ltd."
                        required
                      />
                    </div>

                    {/* Service Dropdown */}
                    <div>
                      <label
                        className="block text-gray-700 font-semibold mb-2"
                        htmlFor="digital-service"
                      >
                        Service Interested In *
                      </label>
                      <select
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors bg-white"
                        id="digital-service"
                        name="service"
                        required
                      >
                        <option value="">Select a service...</option>
                        <option value="custom-website">Custom Website</option>
                        <option value="branding-logo">Branding & Logo</option>
                        <option value="seo-strategy">SEO Strategy</option>
                        <option value="social-media">
                          Social Media Management
                        </option>
                      </select>
                    </div>

                    {/* Preferred Contact Method */}
                    <div className="border-2 border-gray-200 rounded-lg p-4">
                      <label className="block text-gray-700 font-semibold mb-3">
                        How should we reach you? *
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="email"
                            checked={contactMethod === "email"}
                            onChange={(e) =>
                              setContactMethod(
                                e.target.value as "email" | "phone",
                              )
                            }
                            className="mt-1 w-4 h-4 text-cyan-600 border-gray-300 focus:ring-cyan-500"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Mail className="w-5 h-5 text-cyan-600" />
                              <span className="font-semibold text-gray-900">
                                By Email
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Classic & Professional
                            </p>
                          </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="phone"
                            checked={contactMethod === "phone"}
                            onChange={(e) =>
                              setContactMethod(
                                e.target.value as "email" | "phone",
                              )
                            }
                            className="mt-1 w-4 h-4 text-cyan-600 border-gray-300 focus:ring-cyan-500"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <MessageSquare className="w-5 h-5 text-cyan-600" />
                              <span className="font-semibold text-gray-900">
                                By Phone / WhatsApp
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Direct & Agile
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Discovery Call Checkbox */}
                    <div className="border-2 border-cyan-100 bg-cyan-50/30 rounded-lg p-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={discoveryCall}
                          onChange={(e) => setDiscoveryCall(e.target.checked)}
                          className="mt-1 w-5 h-5 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-cyan-600" />
                            <span className="font-semibold text-gray-900">
                              Schedule a 15-min discovery call
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Get personalized insights from our experts
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Message/Additional Needs */}
                    <div>
                      <label
                        className="block text-gray-700 font-semibold mb-2"
                        htmlFor="digital-message"
                      >
                        Message / Additional Needs
                      </label>
                      <textarea
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                        id="digital-message"
                        name="message"
                        rows={4}
                        placeholder="Tell us more about your project..."
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-[1.02] shadow-lg"
                    type="submit"
                  >
                    Get my Digital Quote
                  </button>

                  {/* Switch to Other Service */}
                  <div className="text-center mt-6">
                    <p className="text-gray-600 text-sm">
                      Need the other service?{" "}
                      <button
                        type="button"
                        className="text-cyan-600 font-semibold hover:text-cyan-700 underline"
                        onClick={switchToConsulting}
                      >
                        Click here
                      </button>
                    </p>
                  </div>
                </form>
              </>
            ) : (
              /* Thank You State */
              <div className="p-12 text-center">
                <div className="bg-cyan-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-cyan-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Thank You!
                </h3>
                <p className="text-gray-600 mb-6">
                  We've received your request and will get back to you within 24
                  hours with your digital quote.
                </p>
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <span>Follow us on</span>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-600 font-semibold hover:text-cyan-700"
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </a>
                </div>
                <button
                  className="mt-8 text-gray-500 hover:text-gray-700 underline"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Overlay for Strategic Consulting Form */}
      {activeModal === "consulting" && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {!isSubmitted ? (
              <>
                {/* Header with Navy accent */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 text-white sticky top-0 z-10">
                  <button
                    className="absolute top-6 right-6 text-white hover:text-gray-200 transition-colors"
                    onClick={closeModal}
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <Scale className="w-12 h-12 mb-4" />
                  <h3 className="text-3xl font-bold mb-2">
                    Strategic Corporate Advisory
                  </h3>
                  <p className="text-gray-300">
                    Expert guidance for your business success
                  </p>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-8">
                  <div className="space-y-5">
                    {/* Name Field */}
                    <div>
                      <label
                        className="block text-gray-700 font-semibold mb-2"
                        htmlFor="consulting-name"
                      >
                        Name *
                      </label>
                      <input
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-slate-700 focus:outline-none transition-colors"
                        id="consulting-name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    {/* Business Email */}
                    <div>
                      <label
                        className="block text-gray-700 font-semibold mb-2"
                        htmlFor="consulting-email"
                      >
                        Business Email *
                      </label>
                      <input
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-slate-700 focus:outline-none transition-colors"
                        id="consulting-email"
                        name="email"
                        type="email"
                        placeholder="john@company.com"
                        required
                      />
                    </div>

                    {/* Phone Number with Country Code */}
                    <div>
                      <label
                        className="block text-gray-700 font-semibold mb-2"
                        htmlFor="consulting-phone"
                      >
                        Phone Number *
                      </label>
                      <div className="flex gap-2">
                        <select
                          className="px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-slate-700 focus:outline-none transition-colors bg-white"
                          name="countryCode"
                          defaultValue="+216"
                        >
                          <option value="+216">🇹🇳 +216</option>
                          <option value="+213">🇩🇿 +213</option>
                          <option value="+212">🇲🇦 +212</option>
                          <option value="+33">🇫🇷 +33</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                        </select>
                        <input
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-slate-700 focus:outline-none transition-colors"
                          id="consulting-phone"
                          name="phone"
                          type="tel"
                          placeholder="XX XXX XXX"
                          required
                        />
                      </div>
                    </div>

                    {/* Service Dropdown */}
                    <div>
                      <label
                        className="block text-gray-700 font-semibold mb-2"
                        htmlFor="consulting-service"
                      >
                        Service Interested In *
                      </label>
                      <select
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-slate-700 focus:outline-none transition-colors bg-white"
                        id="consulting-service"
                        name="service"
                        required
                      >
                        <option value="">Select a service...</option>
                        <option value="company-formation">
                          Company Formation
                        </option>
                        <option value="tax-legal">Tax & Legal Advisory</option>
                        <option value="domiciliation">
                          Domiciliation Services
                        </option>
                      </select>
                    </div>

                    {/* Preferred Contact Method */}
                    <div className="border-2 border-gray-200 rounded-lg p-4">
                      <label className="block text-gray-700 font-semibold mb-3">
                        How should we reach you? *
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="email"
                            checked={contactMethod === "email"}
                            onChange={(e) =>
                              setContactMethod(
                                e.target.value as "email" | "phone",
                              )
                            }
                            className="mt-1 w-4 h-4 text-slate-700 border-gray-300 focus:ring-slate-500"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Mail className="w-5 h-5 text-slate-700" />
                              <span className="font-semibold text-gray-900">
                                By Email
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Classic & Professional
                            </p>
                          </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="phone"
                            checked={contactMethod === "phone"}
                            onChange={(e) =>
                              setContactMethod(
                                e.target.value as "email" | "phone",
                              )
                            }
                            className="mt-1 w-4 h-4 text-slate-700 border-gray-300 focus:ring-slate-500"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <MessageSquare className="w-5 h-5 text-slate-700" />
                              <span className="font-semibold text-gray-900">
                                By Phone / WhatsApp
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Direct & Agile
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Discovery Call Checkbox */}
                    <div className="border-2 border-slate-100 bg-slate-50/30 rounded-lg p-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={discoveryCall}
                          onChange={(e) => setDiscoveryCall(e.target.checked)}
                          className="mt-1 w-5 h-5 text-slate-700 border-gray-300 rounded focus:ring-slate-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-slate-700" />
                            <span className="font-semibold text-gray-900">
                              Schedule a 15-min discovery call
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Get personalized insights from our experts
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Message/Additional Needs */}
                    <div>
                      <label
                        className="block text-gray-700 font-semibold mb-2"
                        htmlFor="consulting-message"
                      >
                        Message / Additional Needs
                      </label>
                      <textarea
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-slate-700 focus:outline-none transition-colors resize-none"
                        id="consulting-message"
                        name="message"
                        rows={4}
                        placeholder="Tell us about your business needs..."
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    className="w-full mt-6 bg-gradient-to-r from-slate-800 to-slate-900 text-white py-4 rounded-lg font-semibold hover:from-slate-700 hover:to-slate-800 transition-all transform hover:scale-[1.02] shadow-lg"
                    type="submit"
                  >
                    Schedule a Consultation
                  </button>

                  {/* Switch to Other Service */}
                  <div className="text-center mt-6">
                    <p className="text-gray-600 text-sm">
                      Need the other service?{" "}
                      <button
                        type="button"
                        className="text-slate-700 font-semibold hover:text-slate-800 underline"
                        onClick={switchToDigital}
                      >
                        Click here
                      </button>
                    </p>
                  </div>
                </form>
              </>
            ) : (
              /* Thank You State */
              <div className="p-12 text-center">
                <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-slate-700" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Thank You!
                </h3>
                <p className="text-gray-600 mb-6">
                  We've received your consultation request. Our expert team will
                  contact you within 24 hours to schedule your appointment.
                </p>
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <span>Follow us on</span>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-slate-700 font-semibold hover:text-slate-800"
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </a>
                </div>
                <button
                  className="mt-8 text-gray-500 hover:text-gray-700 underline"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
