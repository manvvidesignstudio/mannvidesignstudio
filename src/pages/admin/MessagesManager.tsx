import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Clock, CheckCircle2, Trash2, Filter } from 'lucide-react';
import { getContactMessages, updateMessageStatus, deleteContactMessage } from '../../lib/cmsStore';
import { ContactMessage, InquiryStatus } from '../../types/database';

export const MessagesManager: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const data = await getContactMessages();
    setMessages(data || []);
  };

  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    await updateMessageStatus(id, newStatus);
    showNotify(`Inquiry status updated to ${newStatus}.`);
    loadMessages();
    if (selectedMessage?.id === id) {
      setSelectedMessage((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Delete inquiry from "${name}"?`)) {
      await deleteContactMessage(id);
      showNotify('Inquiry deleted.');
      if (selectedMessage?.id === id) setSelectedMessage(null);
      loadMessages();
    }
  };

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const filtered = messages.filter((m) => {
    if (statusFilter === 'All') return true;
    return m.status === statusFilter;
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 gap-4">
        <div>
          <h2 className="text-2xl font-serif text-neutral-900 font-normal">Contact Inquiries CRM</h2>
          <p className="text-xs text-neutral-500 mt-1">
            Track client leads, project typology requests, and consultation statuses.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-neutral-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs text-neutral-800 focus:outline-none"
          >
            <option value="All">All Inquiries ({messages.length})</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800 rounded-lg flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Split View: List on left, details on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-xs text-neutral-400">No inquiries matching filter.</div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {filtered.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedMessage?.id === msg.id ? 'bg-[#C8A97E]/10' : 'hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-neutral-900">{msg.name}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        msg.status === 'New'
                          ? 'bg-amber-100 text-amber-800'
                          : msg.status === 'Contacted'
                          ? 'bg-blue-100 text-blue-800'
                          : msg.status === 'In Progress'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {msg.status}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 mt-1">
                    {msg.project_type} · {msg.location}
                  </p>

                  <p className="text-xs text-neutral-400 mt-1 line-clamp-1 italic">"{msg.message}"</p>

                  <div className="flex items-center justify-between text-[10px] text-neutral-400 mt-2">
                    <span>{new Date(msg.created_at).toLocaleDateString()}</span>
                    <span>{msg.budget || 'Budget TBD'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-6 sticky top-24">
          {selectedMessage ? (
            <>
              <div className="flex items-start justify-between pb-4 border-b border-neutral-100">
                <div>
                  <h3 className="text-lg font-serif text-neutral-900 font-semibold">{selectedMessage.name}</h3>
                  <p className="text-xs text-neutral-500 font-mono">
                    Received {new Date(selectedMessage.created_at).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(selectedMessage.id, selectedMessage.name)}
                  className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded"
                  title="Delete Inquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Status Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                  Pipeline Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['New', 'Contacted', 'In Progress', 'Completed'] as InquiryStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(selectedMessage.id, st)}
                      className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                        selectedMessage.status === st
                          ? 'bg-neutral-900 text-white shadow-sm'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Coordinates */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-neutral-400 uppercase font-semibold text-[10px]">Email</span>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-neutral-900 font-medium hover:text-[#C8A97E] block truncate"
                  >
                    {selectedMessage.email}
                  </a>
                </div>

                <div className="space-y-1">
                  <span className="text-neutral-400 uppercase font-semibold text-[10px]">Phone</span>
                  <a
                    href={`tel:${selectedMessage.phone}`}
                    className="text-neutral-900 font-medium hover:text-[#C8A97E] block"
                  >
                    {selectedMessage.phone || 'Not provided'}
                  </a>
                </div>

                <div className="space-y-1">
                  <span className="text-neutral-400 uppercase font-semibold text-[10px]">Typology</span>
                  <p className="text-neutral-900 font-medium">{selectedMessage.project_type}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-neutral-400 uppercase font-semibold text-[10px]">Estimated Budget</span>
                  <p className="text-neutral-900 font-medium">{selectedMessage.budget || 'TBD'}</p>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5 pt-2 border-t border-neutral-100">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                  Client Brief & Inquiry Note
                </span>
                <div className="p-4 bg-neutral-50 rounded-lg text-xs text-neutral-800 leading-relaxed font-sans whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>
            </>
          ) : (
            <div className="py-20 text-center text-neutral-400 text-xs">
              Select an inquiry from the left to view comprehensive client details and update status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
