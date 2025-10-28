import ErrorRow from './ErrorRow';

function ErrorResults({ errors, onResolve, onExport }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center bg-gray-100 p-6">
        <div className="flex flex-col items-baseline gap-1">
          <h2 className="text-base font-semibold text-gray-900">Error Results</h2>
          <p className="text-sm text-gray-500">
            Showing {errors.length} of {errors.length} total errors
          </p>
        </div>
        <button
          onClick={onExport}
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 font-medium border border-gray-300 rounded-lg px-4 py-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export to CSV
        </button>
      </div>

      {errors.length === 0 ? (
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <div className="text-gray-400 text-4xl mb-4">📋</div>
            <p className="text-gray-500">No errors found matching your criteria</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {errors.map((error) => (
            <ErrorRow
              key={`${error.orderId}-${error.dateSubmitted}`}
              error={error}
              onResolve={onResolve}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ErrorResults;

