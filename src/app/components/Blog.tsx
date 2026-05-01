import { Search, Clock, ArrowRight, Building2, Globe, Users } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

type Category = 'All' | 'Legal/Fiscal' | 'Digital/Tech';

interface Article {
  id: number;
  title: string;
  category: 'Legal/Fiscal' | 'Digital/Tech';
  readTime: string;
  thumbnail: string;
  excerpt: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: 'Navigating Tunisia\'s 2026 Tax Reform: What Businesses Need to Know',
    category: 'Legal/Fiscal',
    readTime: '5 min',
    thumbnail: 'https://images.unsplash.com/photo-1764106813759-9ef7bf42a0af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxlZ2FsJTIwZG9jdW1lbnRzJTIwY29udHJhY3R8ZW58MXx8fHwxNzcxNzYxODk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    excerpt: 'Understanding the latest fiscal changes and compliance requirements for Tunisian companies.'
  },
  {
    id: 2,
    title: 'The Future of Web Development: Trends Shaping Digital Presence',
    category: 'Digital/Tech',
    readTime: '7 min',
    thumbnail: 'https://images.unsplash.com/photo-1601387913800-b48217dc5fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVjaG5vbG9neSUyMHN0YXJ0dXAlMjBvZmZpY2V8ZW58MXx8fHwxNzcxNzYxODk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    excerpt: 'Exploring cutting-edge technologies and strategies for modern web solutions.'
  },
  {
    id: 3,
    title: 'Corporate Structuring: Choosing the Right Business Entity in Tunisia',
    category: 'Legal/Fiscal',
    readTime: '6 min',
    thumbnail: 'https://images.unsplash.com/photo-1762151662378-f40e20901824?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXglMjBhY2NvdW50aW5nJTIwZmluYW5jaWFsJTIwY29uc3VsdGluZ3xlbnwxfHx8fDE3NzE3NjE4OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    excerpt: 'A comprehensive guide to selecting the optimal legal structure for your venture.'
  },
  {
    id: 4,
    title: 'Building High-Performance Web Applications with Modern Frameworks',
    category: 'Digital/Tech',
    readTime: '8 min',
    thumbnail: 'https://images.unsplash.com/photo-1540397106260-e24a507a08ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZyUyMGxhcHRvcHxlbnwxfHx8fDE3NzE3NDI3MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    excerpt: 'Best practices for creating scalable and efficient digital solutions.'
  },
  {
    id: 5,
    title: 'Legal Compliance for Cross-Border Business Operations',
    category: 'Legal/Fiscal',
    readTime: '5 min',
    thumbnail: 'https://images.unsplash.com/photo-1758518731462-d091b0b4ed0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBsYXclMjBvZmZpY2UlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcxNzYxOTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    excerpt: 'Essential regulatory considerations for international business expansion.'
  },
  {
    id: 6,
    title: 'Social Media Strategies for B2B Companies in 2026',
    category: 'Digital/Tech',
    readTime: '6 min',
    thumbnail: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwc29jaWFsJTIwbWVkaWF8ZW58MXx8fHwxNzcxNjk0MDIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    excerpt: 'Maximizing your corporate visibility through strategic digital marketing.'
  },
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [email, setEmail] = useState('');

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
    alert('Thank you for subscribing to our B2B insights!');
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <nav className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold tracking-wider hover:text-cyan-400 transition-colors">
              Y.R SOFT CONSULTING
            </Link>
            <div className="flex items-center gap-8">
              <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
              <a href="/#services" className="hover:text-cyan-400 transition-colors">Services</a>
              <Link to="/blog" className="text-cyan-400 font-semibold">Blog</Link>
              <a href="/#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Insights & Expertise
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stay informed with the latest trends in digital transformation and corporate advisory
          </p>
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Category Filters */}
            <div className="flex gap-2">
              {(['All', 'Legal/Fiscal', 'Digital/Tech'] as Category[]).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    selectedCategory === category
                      ? category === 'Legal/Fiscal'
                        ? 'bg-slate-800 text-white'
                        : category === 'Digital/Tech'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-800 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Articles Grid */}
            <div className="flex-1">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Category Tag */}
                      <div
                        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                          article.category === 'Legal/Fiscal'
                            ? 'bg-slate-800'
                            : 'bg-cyan-500'
                        }`}
                      >
                        {article.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3
                        className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime} read</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-cyan-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg">No articles found matching your search.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:w-80 space-y-8">
              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Join Our Newsletter
                </h3>
                <p className="text-gray-300 text-sm mb-6">
                  Get exclusive B2B insights, industry trends, and expert advice delivered to your inbox.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Subscribe Now
                  </button>
                </form>
              </div>

              {/* Top Services */}
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Top Services
                </h3>
                <div className="space-y-4">
                  <Link
                    to="/#services"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-cyan-50 transition-colors group"
                  >
                    <div className="bg-cyan-100 p-2 rounded-lg group-hover:bg-cyan-200 transition-colors">
                      <Building2 className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Company Formation</h4>
                      <p className="text-xs text-gray-600">Legal structure & setup</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link
                    to="/#services"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                  >
                    <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Domiciliation</h4>
                      <p className="text-xs text-gray-600">Professional address</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link
                    to="/#services"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                  >
                    <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-slate-200 transition-colors">
                      <Globe className="w-5 h-5 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Custom Web Dev</h4>
                      <p className="text-xs text-gray-600">Digital solutions</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-gray-300 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">Y.R SOFT CONSULTING</h3>
              <p className="text-gray-400 mb-6">
                Your trusted partner for digital innovation and strategic business consulting
              </p>
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-semibold mb-1">Tunis Office</p>
                  <p className="text-gray-400">
                    Centre Urbain Nord<br />
                    1082 Tunis, Tunisia
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Sitemap</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-cyan-400 transition-colors">Home</Link></li>
                <li><a href="/#services" className="text-gray-400 hover:text-cyan-400 transition-colors">Services</a></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors">Blog</Link></li>
                <li><a href="/#contact" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">© 2026 Y.R SOFT CONSULTING. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
