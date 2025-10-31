import { useState, useEffect } from 'react';
import Header from '../components/Header';
import FilterCriteria from '../components/FilterCriteria';
import ErrorResults from '../components/ErrorResults';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { resolutionService } from '../services/resolutionService';

function ErrorTrackerPage() {
  const [errors, setErrors] = useState([]);
  const [filteredErrors, setFilteredErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const getResolutions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await resolutionService.getAllResolutions();
      if (response.status) {
        setErrors(response.data);
        setFilteredErrors(response.data); // Also update filtered errors
        console.log('Resolutions loaded:', response.data);
      } else {
        setError(response.message);
        console.error('Failed to fetch resolutions:', response.message);
      }
    } catch (err) {
      setError('Failed to fetch resolution records');
      console.error('Error fetching resolutions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getResolutions();
  }, []);
  
  const handleFilter = async (filters) => {
    try {
      const response = await resolutionService.getAllResolutions(filters);
      if (response.status) {
        setFilteredErrors(response.data);
        setError(null);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to filter errors');
      console.error('Error filtering errors:', err);
    }
  };

  const handleResolve = async (orderId, dateSubmitted, comment) => {
    try {
      setError(null); // Clear any existing errors
      setSuccess(null); // Clear any existing success messages
      
      const response = await resolutionService.resolveRecord(
        orderId, 
        dateSubmitted, 
        'Current User', // You can replace this with actual user name
        comment
      );
      
      if (response.status) {
        // Refresh the data after successful resolve
        await getResolutions();
        setSuccess(`Record ${orderId} resolved successfully!`);
        console.log('Record resolved successfully');
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => setSuccess(null), 5000);
      } else {
        setError(`Failed to resolve record: ${response.message}`);
        console.error('Failed to resolve record:', response.message);
      }
    } catch (err) {
      setError('Failed to resolve record');
      console.error('Error resolving record:', err);
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
        {/* Success Message */}
        <ErrorAlert 
          error={success}
          onDismiss={() => setSuccess(null)}
          type="success"
          className="mb-6"
        />

        {/* Error Message */}
        <ErrorAlert 
          error={error}
          onDismiss={() => setError(null)}
          type="error"
          className="mb-6"
        />

        <FilterCriteria
          onFilter={handleFilter}
          onClearAll={handleClearAll}
          disabled={isLoading}
        />
        
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ErrorResults
            errors={filteredErrors}
            onResolve={handleResolve}
            onExport={handleExport}
          />
        )}
      </div>
    </div>
  );
}

export default ErrorTrackerPage;

