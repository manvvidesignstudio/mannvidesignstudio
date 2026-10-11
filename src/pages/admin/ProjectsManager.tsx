import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit3, Trash2, Eye, EyeOff, Star, CheckCircle2 } from 'lucide-react';
import { getProjects, saveProject, deleteProject } from '../../lib/cmsStore';
import { Project } from '../../types/database';

export const ProjectsManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const data = await getProjects();
    setProjects(data || []);
    setLoading(false);
  };

  const handleTogglePublish = async (project: Project) => {
    const updated = { ...project, published: !project.published };
    await saveProject(updated);
    showNotify(`Project "${project.title}" ${updated.published ? 'published' : 'hidden'}.`);
    loadProjects();
  };

  const handleToggleFeatured = async (project: Project) => {
    const updated = { ...project, featured: !project.featured };
    await saveProject(updated);
    showNotify(`Featured status updated for "${project.title}".`);
    loadProjects();
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await deleteProject(id);
      showNotify(`Deleted "${title}".`);
      loadProjects();
    }
  };

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 gap-4">
        <div>
          <h2 className="text-2xl font-serif text-neutral-900 font-normal">Projects Portfolio CMS</h2>
          <p className="text-xs text-neutral-500 mt-1">
            Create, edit, organize and publish architectural projects.
          </p>
        </div>

        <Link
          to="/admin/projects/new"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-medium hover:bg-neutral-800 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Project</span>
        </Link>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800 rounded-lg flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs text-neutral-500 font-medium">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs text-neutral-800 focus:outline-none"
          >
            <option value="All">All Categories ({projects.length})</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Hospitality">Hospitality</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-neutral-400">Loading portfolio projects...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <p className="text-sm font-medium text-neutral-700">No projects found</p>
            <p className="text-xs text-neutral-400">Try adjusting your search criteria or create a new project.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50 text-[11px] uppercase tracking-wider text-neutral-500 font-semibold border-b border-neutral-200">
                <tr>
                  <th className="py-3.5 px-4">Project</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Year</th>
                  <th className="py-3.5 px-4 text-center">Featured</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-xs">
                {filtered.map((project) => (
                  <tr key={project.id} className="hover:bg-neutral-50/70 transition-colors">
                    {/* Thumbnail + Title */}
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={project.cover_image}
                          alt={project.title}
                          className="w-12 h-9 object-cover rounded bg-neutral-200 flex-shrink-0"
                        />
                        <div>
                          <Link
                            to={`/admin/projects/${project.id}`}
                            className="font-medium text-neutral-900 hover:text-[#C8A97E] block text-sm"
                          >
                            {project.title}
                          </Link>
                          <span className="text-[10px] text-neutral-400 font-mono">{project.slug}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-neutral-600">
                      <span className="px-2 py-0.5 bg-neutral-100 rounded text-[11px]">
                        {project.category}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-neutral-600">{project.location}</td>
                    <td className="py-3 px-4 text-neutral-600 font-mono">{project.year}</td>

                    {/* Featured */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(project)}
                        className={`p-1 rounded ${
                          project.featured ? 'text-amber-500 hover:text-amber-600' : 'text-neutral-300 hover:text-neutral-500'
                        }`}
                        title="Toggle Featured on Homepage"
                      >
                        <Star className={`w-4 h-4 ${project.featured ? 'fill-amber-400' : ''}`} />
                      </button>
                    </td>

                    {/* Published status */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleTogglePublish(project)}
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                          project.published
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-neutral-100 text-neutral-500'
                        }`}
                      >
                        {project.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{project.published ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/portfolio/${project.slug}`}
                          target="_blank"
                          className="p-1 text-neutral-400 hover:text-neutral-700"
                          title="View on site"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/projects/${project.id}`}
                          className="p-1 text-neutral-400 hover:text-neutral-700"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(project.id, project.title)}
                          className="p-1 text-neutral-400 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
  );
};
