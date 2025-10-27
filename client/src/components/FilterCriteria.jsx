import { useState } from 'react';
import FilterInput from './FilterInput';
import FilterSelect from './FilterSelect';

const statusOptions = [
  { value: 'all', label: 'All Errors' },
  { value: 'unresolved', label: 'Unresolved' },
  { value: 'resolved', label: 'Resolved' }
];

function FilterCriteria({ onFilter, onClearAll }) {
  const [filters, setFilters] = useState({
    status: 'all',
    orderId: '',
    fromDate: '',
    toDate: '',
    errorMessage: '',
    errorCode: ''
  });

  const handleChange = (e) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleStatusChange = (status) => {
    const newFilters = { ...filters, status };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      status: 'all',
      orderId: '',
      fromDate: '',
      toDate: '',
      errorMessage: '',
      errorCode: ''
    };
    setFilters(clearedFilters);
    onClearAll();
  };

  const errorCodeOptions = [
    { value: 'AA', label: 'AA - Application Accept' },
    { value: 'AE', label: 'AE - Application Error' },
    { value: 'AR', label: 'AR - Application Reject' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base font-semibold text-gray-900">Filter Criteria</h2>
        <button
          onClick={handleClearAll}
          className="text-sm text-gray-600 hover:text-gray-800 font-medium flex justify-center items-center gap-1 border border-gray-200 rounded-full px-2 py-1"
        >
          <span className="text-base">×</span>
          Clear All
        </button>
      </div>

      {/* Status Label */}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Status</label>
      </div>

      {/* Status Filters - Segmented Control */}
      <div className="flex bg-gray-100 rounded-full p-1 mb-6">
        {statusOptions.map((option) => (
          <button
            onClick={() => handleStatusChange(option.value)}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${filters.status ===   option.value
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Filter Fields */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <FilterInput
          label="Order ID / Sample ID"
          type="text"
          name="orderId"
          value={filters.orderId}
          onChange={handleChange}
          placeholder="Enter ID..."
        />

        <FilterInput
          label="From Date"
          type="date"
          name="fromDate"
          value={filters.fromDate}
          onChange={handleChange}
          placeholder="Pick a date"
        />

        <FilterInput
          label="To Date"
          type="date"
          name="toDate"
          value={filters.toDate}
          onChange={handleChange}
          placeholder="Pick a date"
        />

        <FilterInput
          label="Error Message"
          type="text"
          name="errorMessage"
          value={filters.errorMessage}
          onChange={handleChange}
          placeholder="Any match..."
        />

        <FilterSelect
          label="Error Code"
          name="errorCode"
          value={filters.errorCode}
          onChange={handleChange}
          options={errorCodeOptions}
          placeholder="Select error code..."
        />
      </div>
    </div>
  );
}

export default FilterCriteria;

