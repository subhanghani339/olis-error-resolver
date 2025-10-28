import { useState, useEffect } from 'react';
import Header from '../components/Header';
import FilterCriteria from '../components/FilterCriteria';
import ErrorResults from '../components/ErrorResults';
import { resolutionService } from '../services/resolutionService';

function ErrorTrackerPage() {
  // Mock data matching the screenshot
  const [errors, setErrors] = useState([]);

  const [filteredErrors, setFilteredErrors] = useState([]);

  const getResolutions = async () => {
    try {
      const response = await resolutionService.getAllResolutions();
      if (response.status) {
        setErrors(response.data);
        setFilteredErrors(response.data); // Also update filtered errors
        console.log('Resolutions loaded:', response.data);
      } else {
        console.error('Failed to fetch resolutions:', response.message);
      }
    } catch (error) {
      console.error('Error fetching resolutions:', error);
    }
  };

  useEffect(() => {
    getResolutions();
  }, []);
  const handleFilter = (filters) => {
    let filtered = [...errors];
    // Filter by order ID
    if (filters.orderId) {
      filtered = filtered.filter(e =>
        e.orderId.toLowerCase().includes(filters.orderId.toLowerCase())
      );
    }

    // Filter by error message
    if (filters.errorMessage) {
      filtered = filtered.filter(e =>
        e.errorMessage.toLowerCase().includes(filters.errorMessage.toLowerCase())
      );
    }

    // Filter by error code
    if (filters.errorCode) {
      filtered = filtered.filter(e =>
        e.errorCode.toLowerCase().includes(filters.errorCode.toLowerCase())
      );
    }

    // Filter by date range
    if (filters.fromDate) {
      filtered = filtered.filter(e => {
        const errorDate = new Date(e.dateSubmitted);
        const fromDate = new Date(filters.fromDate);
        return errorDate >= fromDate;
      });
    }

    if (filters.toDate) {
      filtered = filtered.filter(e => {
        const errorDate = new Date(e.dateSubmitted);
        const toDate = new Date(filters.toDate);
        toDate.setHours(23, 59, 59, 999); // Include the entire day
        return errorDate <= toDate;
      });
    }

    setFilteredErrors(filtered);
  };

  const handleResolve = async (orderId, dateSubmitted, comment) => {
    try {
      const response = await resolutionService.resolveRecord(
        orderId, 
        dateSubmitted, 
        'Current User', // You can replace this with actual user name
        comment
      );
      
      if (response.status) {
        // Refresh the data after successful resolve
        await getResolutions();
        console.log('Record resolved successfully');
      } else {
        console.error('Failed to resolve record:', response.message);
      }
    } catch (error) {
      console.error('Error resolving record:', error);
    }
  };

  const handleExport = () => {
    // Convert to CSV
    const headers = ['Order ID', 'Date Submitted', 'Error Code', 'Error Message', 'HL7 Segment', 'Status', 'Comments', 'Resolved By', 'Resolved Date'];
    
    const csvContent = [
      headers.join(','),
      ...filteredErrors.map(e => [
        e.orderId || '',
        e.dateSubmitted || '',
        e.errorCode || '',
        `"${(e.errorMessage || '').replace(/"/g, '""')}"`, // Escape quotes in error message
        e.hl7Segment || '',
        e.status || '',
        `"${(e.comments || '').replace(/"/g, '""')}"`, // Escape quotes in comments
        e.resolvedBy || '',
        e.resolvedDate || ''
      ].join(','))
    ].join('\n');

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `olis-errors-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handleClearAll = () => {
    setFilteredErrors(errors);
  };

  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <Header
        title="OLIS ORU Resolution Tracker"
        subtitle="Review and log resolved errors in one place"
      />

      {/* Main Content */}
      <div className="px-6 py-6">
        <FilterCriteria
          onFilter={handleFilter}
          onClearAll={handleClearAll}
        />
        <ErrorResults
          errors={filteredErrors}
          onResolve={handleResolve}
          onExport={handleExport}
        />
      </div>
    </div>
  );
}

export default ErrorTrackerPage;

