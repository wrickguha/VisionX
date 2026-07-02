import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { ShopLead, BusinessType } from '../types';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { EmptyState } from '../components/ui/EmptyState';
import {
  Eye,
  Edit2,
  Trash2,
  Plus,
  ArrowUpDown,
  Search,
  Filter,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const ShopLeads: React.FC = () => {
  const { leads, deleteLead, searchQuery, setSearchQuery } = useApp();
  const navigate = useNavigate();

  // Filters State
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  // Sorting State
  const [sortField, setSortField] = useState<'businessName' | 'cameraCount' | 'createdAt'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Delete Confirmation Modal State
  const [leadToDelete, setLeadToDelete] = useState<ShopLead | null>(null);

  // Business Type helper
  const businessTypes: Record<BusinessType, string> = {
    retail: 'Retail Store',
    restaurant: 'Restaurant / Café',
    supermarket: 'Supermarket / Grocery',
    warehouse: 'Warehouse / Logistics',
    office: 'Corporate Office',
    other: 'Other Business'
  };

  // Toggle Sorting
  const handleSort = (field: 'businessName' | 'cameraCount' | 'createdAt') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc'); // Default to descending
    }
    setCurrentPage(1);
  };

  // Apply filters, search and sorting
  const filteredLeads = leads
    .filter((lead) => {
      // Search matches Business Name, Owner, Phone or Email
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        lead.businessName.toLowerCase().includes(query) ||
        lead.ownerName.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.phone.includes(query);

      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      const matchesType = typeFilter === 'all' || lead.businessType === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === 'businessName') {
        comparison = a.businessName.localeCompare(b.businessName);
      } else if (sortField === 'cameraCount') {
        comparison = a.cameraDetails.count - b.cameraDetails.count;
      } else if (sortField === 'createdAt') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Pagination Calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

  const handleDeleteConfirm = () => {
    if (leadToDelete) {
      deleteLead(leadToDelete.id);
      setLeadToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-slate-900">Shop Leads</h1>
          <p className="text-xs text-neutral-slate-400 mt-1">Manage and track all security infrastructure client prospects.</p>
        </div>
        <Button
          onClick={() => navigate('/leads/add')}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-sm"
        >
          Add New Shop
        </Button>
      </div>

      {/* Filter and Search Panel */}
      <Card>
        <CardBody className="p-4 flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Inner Search Box */}
          <div className="relative w-full lg:max-w-xs">
            <Search className="w-4 h-4 text-neutral-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by shop or owner..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-slate-200 bg-white text-sm placeholder-neutral-slate-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all"
            />
          </div>

          {/* Filters Select Grid */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-neutral-slate-400" />
              <span className="text-xs font-semibold text-neutral-slate-500">Filter by:</span>
            </div>
            
            {/* Status Select */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs bg-white border border-neutral-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-500 cursor-pointer font-medium text-neutral-slate-700"
            >
              <option value="all">All Statuses</option>
              <option value="new">New Lead</option>
              <option value="demo_scheduled">Demo Scheduled</option>
              <option value="trial_running">Trial Running</option>
              <option value="interested">Interested</option>
              <option value="converted">Converted</option>
              <option value="not_interested">Not Interested</option>
            </select>

            {/* Business Type Select */}
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs bg-white border border-neutral-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-500 cursor-pointer font-medium text-neutral-slate-700"
            >
              <option value="all">All Business Types</option>
              <option value="retail">Retail Store</option>
              <option value="restaurant">Restaurant / Café</option>
              <option value="supermarket">Supermarket / Grocery</option>
              <option value="warehouse">Warehouse / Logistics</option>
              <option value="office">Corporate Office</option>
              <option value="other">Other</option>
            </select>
          </div>
        </CardBody>
      </Card>

      {/* Main Table view */}
      {filteredLeads.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="No Shop Leads Found"
          description="Try broadening your search terms or status filters, or add a new shop lead profile."
          actionLabel="Create Shop Lead"
          onActionClick={() => navigate('/leads/add')}
        />
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-neutral-slate-200/60 shadow-sm overflow-hidden hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-slate-50 border-b border-neutral-slate-200/60 text-xs font-semibold text-neutral-slate-500 uppercase select-none">
                    <th
                      className="px-6 py-4 cursor-pointer hover:bg-neutral-slate-100/80 transition-colors"
                      onClick={() => handleSort('businessName')}
                    >
                      <div className="flex items-center gap-1">
                        Business Name
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </div>
                    </th>
                    <th className="px-6 py-4">Owner / Contact</th>
                    <th className="px-6 py-4">Business Type</th>
                    <th
                      className="px-6 py-4 cursor-pointer hover:bg-neutral-slate-100/80 transition-colors"
                      onClick={() => handleSort('cameraCount')}
                    >
                      <div className="flex items-center gap-1">
                        Cameras
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </div>
                    </th>
                    <th className="px-6 py-4">Status</th>
                    <th
                      className="px-6 py-4 cursor-pointer hover:bg-neutral-slate-100/80 transition-colors"
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="flex items-center gap-1">
                        Created Date
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-slate-100 text-xs">
                  {currentLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-neutral-slate-50/50 transition-colors group cursor-pointer"
                      onClick={() => navigate(`/leads/${lead.id}`)}
                    >
                      <td className="px-6 py-4 font-bold text-neutral-slate-800">
                        {lead.businessName}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-neutral-slate-700">{lead.ownerName}</p>
                          <p className="text-[10px] text-neutral-slate-400 mt-0.5">{lead.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-neutral-slate-500">
                        {businessTypes[lead.businessType]}
                      </td>
                      <td className="px-6 py-4 font-semibold text-neutral-slate-700">
                        {lead.cameraDetails.count} ch
                        <span className="text-[10px] text-neutral-slate-400 font-normal block mt-0.5">
                          {lead.cameraDetails.resolution} ({lead.cameraDetails.type.toUpperCase()})
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge status={lead.status} />
                      </td>
                      <td className="px-6 py-4 text-neutral-slate-450 font-medium">
                        {new Date(lead.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => navigate(`/leads/${lead.id}`)}
                            className="p-2 text-neutral-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => navigate(`/leads/edit/${lead.id}`)}
                            className="p-2 text-neutral-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setLeadToDelete(lead)}
                            className="p-2 text-neutral-slate-400 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-all"
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
          </div>

          {/* Mobile responsive card list view */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {currentLeads.map((lead) => (
              <Card key={lead.id} hoverable onClick={() => navigate(`/leads/${lead.id}`)}>
                <CardBody className="p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-neutral-slate-800 text-sm">{lead.businessName}</h4>
                      <p className="text-[11px] text-neutral-slate-400 mt-0.5">{businessTypes[lead.businessType]}</p>
                    </div>
                    <Badge status={lead.status} size="sm" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs border-y border-neutral-slate-100 py-3">
                    <div>
                      <span className="text-[10px] text-neutral-slate-400 block font-semibold">Contact</span>
                      <span className="font-bold text-neutral-slate-700">{lead.ownerName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-slate-400 block font-semibold">Cams Setup</span>
                      <span className="font-bold text-neutral-slate-700">{lead.cameraDetails.count} Channels</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1" onClick={(e) => e.stopPropagation()}>
                    <span className="text-[10px] text-neutral-slate-400 font-semibold">
                      Created: {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                    
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/leads/${lead.id}`)}
                        className="px-2 py-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/leads/edit/${lead.id}`)}
                        className="px-2 py-1 text-amber-600 hover:text-amber-700"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setLeadToDelete(lead)}
                        className="px-2 py-1 text-danger-500 hover:text-danger-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-white border border-neutral-slate-200/60 rounded-2xl p-4 shadow-sm select-none">
              <span className="text-xs text-neutral-slate-500">
                Showing <span className="font-bold">{indexOfFirstItem + 1}</span> to{' '}
                <span className="font-bold">{Math.min(indexOfLastItem, filteredLeads.length)}</span> of{' '}
                <span className="font-bold">{filteredLeads.length}</span> leads
              </span>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {[...Array(totalPages)].map((_, idx) => (
                  <Button
                    key={idx}
                    variant={currentPage === idx + 1 ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(idx + 1)}
                    className="w-8 h-8 rounded-xl p-0"
                  >
                    {idx + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-2"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={leadToDelete !== null}
        onClose={() => setLeadToDelete(null)}
        title="Confirm Deletion"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setLeadToDelete(null)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleDeleteConfirm}>
              Delete Lead
            </Button>
          </>
        }
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-danger-50 border border-danger-100 flex items-center justify-center text-danger-550 text-danger-500 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-neutral-slate-900">Are you sure you want to delete this lead?</p>
            <p className="text-xs text-neutral-slate-400 mt-2 leading-relaxed">
              This will permanently delete the lead record for{' '}
              <span className="font-bold text-neutral-slate-800">{leadToDelete?.businessName}</span>, including all related
              follow-up reminders and history logs. This action cannot be undone.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
