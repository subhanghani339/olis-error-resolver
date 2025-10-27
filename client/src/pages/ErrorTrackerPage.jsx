import { useState } from 'react';
import Header from '../components/Header';
import FilterCriteria from '../components/FilterCriteria';
import ErrorResults from '../components/ErrorResults';

function ErrorTrackerPage() {
  // Mock data matching the screenshot
  const [errors, setErrors] = useState([
    {
      id: 1,
      orderId: 'SCE2507070000018',
      dateSubmitted: '7/8/2025 10:30 AM',
      errorCode: 'AE',
      errorMessage: 'Invalid patient identifier format',
      hl7Segments: ['PID 3', 'PID 5.3'],
      status: 'unresolved',
      comment: '',
      resolvedBy: ''
    },
    {
      id: 2,
      orderId: 'SCE2507070000018',
      dateSubmitted: '7/8/2025 10:30 AM',
      errorCode: 'AE',
      errorMessage: 'Missing required observation field',
      hl7Segments: ['OBX 3'],
      status: 'unresolved',
      comment: '',
      resolvedBy: ''
    },
    {
      id: 3,
      orderId: 'ORD2509120000087',
      dateSubmitted: '9/12/2025 4:20 PM',
      errorCode: 'AR',
      errorMessage: 'Invalid patient identifier format',
      hl7Segments: ['PID 3'],
      status: 'unresolved',
      comment: '',
      resolvedBy: ''
    },
    {
      id: 4,
      orderId: 'ORD2510180015',
      dateSubmitted: '10/18/2025 1:30 PM',
      errorCode: 'AA',
      errorMessage: 'Missing required observation field',
      hl7Segments: ['OBX 3', 'OBX 5'],
      status: 'resolved',
      comment: 'Field added successfully',
      resolvedBy: 'Sarah Johnson - 10/19/2025 10:15 AM'
    },
    {
      id: 5,
      orderId: 'ORD2510080017',
      dateSubmitted: '10/8/2025 3:45 PM',
      errorCode: 'AE',
      errorMessage: 'Invalid patient identifier format',
      hl7Segments: ['PID 3'],
      status: 'resolved',
      comment: 'Patient ID reformatted per specifications',
      resolvedBy: 'Emily Chen - 10/9/2025 11:00 AM'
    }
  ]);

  const [filteredErrors, setFilteredErrors] = useState(errors);

  const handleFilter = (filters) => {
    let filtered = [...errors];

    // Filter by status
    if (filters.status === 'resolved') {
      filtered = filtered.filter(e => e.status === 'resolved');
    } else if (filters.status === 'unresolved') {
      filtered = filtered.filter(e => e.status === 'unresolved');
    }

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

  const handleResolve = (errorId, comment) => {
    const updatedErrors = errors.map(error => {
      if (error.id === errorId) {
        return {
          ...error,
          status: 'resolved',
          comment: comment,
          resolvedBy: `Current User - ${new Date().toLocaleString()}`
        };
      }
      return error;
    });

    setErrors(updatedErrors);
    setFilteredErrors(updatedErrors);
  };

  const handleExport = () => {
    // Convert to CSV
    const headers = ['Order ID', 'Date Submitted', 'Error Code', 'Error Message', 'HL7 Segment', 'Status', 'Comment', 'Resolved By'];
    const csvContent = [
      headers.join(','),
      ...filteredErrors.map(e => 
        [e.orderId, e.dateSubmitted, e.errorCode, e.errorMessage, e.hl7Segments.join(';'), e.status, e.comment, e.resolvedBy].join(',')
      )
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

