import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  Inbox,
  Images,
  MessageSquareQuote,
  ArrowUpRight,
  Sparkles,
  Plus,
  Clock,
  CheckCircle2
} from 'lucide-react';
import {
  getProjects,
  getContactMessages,
  getTestimonials,
  getGallery,
  getServices,
} from '../../lib/cmsStore';
import { Project, ContactMessage, Testimonial, GalleryItem } from '../../types/database';

export const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getProjects(),
      getContactMessages(),
      getTestimonials(),
      getGallery(),
    ]).then(([p, m, t, g]) => {
      setProjects(p || []);
      setMessages(m || []);
      setTestimonials(t || []);
      setGallery(g || []);
      setLoading(false);
    });
  }, []);

  const publishedProjects = projects.filter((p) => p.published).length;
  const newMessages = messages.filter((m) => m.status === 'New').length;

  return (
    <div className="space-y-8 font-sans">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 gap-4">
        <div>
          <h2 className="text-2xl font-serif text-neutral-900 font-normal">Studio Overview</h2>
          <p className="text-xs text-neutral-500 mt-1">
            Real-time management for Manvvi Design Studio portfolio, inquiries & content.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/admin/projects/new"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-medium hover:bg-neutral-800 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </Link>
          <Link
            to="/admin/hero"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-lg text-xs font-medium hover:bg-neutral-50 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C8A97E]" />
            <span>Edit Hero</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Projects */}
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Projects</span>
            <FolderKanban className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-serif text-neutral-900">{projects.length}</span>
            <span className="text-xs text-emerald-600 font-medium">({publishedProjects} published)</span>
          </div>
          <p className="text-[11px] text-neutral-400">Architectural portfolio records</p>
        </div>

        {/* Contact Enquiries */}
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Inquiries</span>
            <Inbox className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-serif text-neutral-900">{messages.length}</span>
            {newMessages > 0 && (
              <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full font-medium">
                {newMessages} New
              </span>
            )}
          </div>
          <p className="text-[11px] text-neutral-400">Client briefs received</p>
        </div>

        {/* Client Testimonials */}
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Testimonials</span>
            <MessageSquareQuote className="w-4 h-4 text-neutral-400" />
          </div>
          <span className="text-3xl font-serif text-neutral-900 block">{testimonials.length}</span>
          <p className="text-[11px] text-neutral-400">Curated homeowner feedback</p>
        </div>

        {/* Gallery Assets */}
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Journal Images</span>
            <Images className="w-4 h-4 text-neutral-400" />
          </div>
          <span className="text-3xl font-serif text-neutral-900 block">{gallery.length}</span>
          <p className="text-[11px] text-neutral-400">Editorial visual assets</p>
        </div>
      </div>

      {/* Two Column Layout: Recent Inquiries & Projects Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inquiries Table */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <h3 className="text-sm font-semibold text-neutral-900">Recent Client Inquiries</h3>
            <Link to="/admin/messages" className="text-xs text-[#C8A97E] hover:underline font-medium">
              View All ({messages.length}) →
            </Link>
          </div>

          {messages.length === 0 ? (
            <p className="text-xs text-neutral-400 py-6 text-center">No client inquiries received yet.</p>
          ) : (
            <div className="divide-y divide-neutral-100">
              {messages.slice(0, 4).map((msg) => (
                <div key={msg.id} className="py-3 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-neutral-900">{msg.name}</p>
                    <p className="text-xs text-neutral-500">
                      {msg.project_type} · {msg.location}
                    </p>
                    <p className="text-xs text-neutral-400 line-clamp-1 italic">"{msg.message}"</p>
                  </div>

                  <div className="flex flex-col items-end space-y-1 flex-shrink-0">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        msg.status === 'New'
                          ? 'bg-amber-100 text-amber-800'
                          : msg.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {msg.status}
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Management Shortcuts */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-semibold text-neutral-900">CMS Quick Actions</h3>

            <div className="space-y-2">
              <Link
                to="/admin/projects"
                className="flex items-center justify-between p-3 rounded-lg border border-neutral-100 hover:bg-neutral-50 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <FolderKanban className="w-4 h-4 text-neutral-500" />
                  <span className="text-xs font-medium text-neutral-800">Manage Projects Portfolio</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900" />
              </Link>

              <Link
                to="/admin/hero"
                className="flex items-center justify-between p-3 rounded-lg border border-neutral-100 hover:bg-neutral-50 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-4 h-4 text-neutral-500" />
                  <span className="text-xs font-medium text-neutral-800">Update Hero Title & Background</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900" />
              </Link>

              <Link
                to="/admin/gallery"
                className="flex items-center justify-between p-3 rounded-lg border border-neutral-100 hover:bg-neutral-50 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <Images className="w-4 h-4 text-neutral-500" />
                  <span className="text-xs font-medium text-neutral-800">Upload Visual Journal Images</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900" />
              </Link>

              <Link
                to="/admin/settings"
                className="flex items-center justify-between p-3 rounded-lg border border-neutral-100 hover:bg-neutral-50 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-neutral-500" />
                  <span className="text-xs font-medium text-neutral-800">Studio Hours & Contact Settings</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
