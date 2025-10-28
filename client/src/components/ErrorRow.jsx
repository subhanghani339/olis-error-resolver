import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

function ErrorRow({ error, onResolve }) {
  const [comment, setComment] = useState('');
  const [isResolving, setIsResolving] = useState(false);

  const handleResolve = async () => {
    if (comment.trim() && !isResolving) {
      try {
        setIsResolving(true);
        await onResolve(error.orderId, error.dateSubmitted, comment);
        setComment('');
      } catch (err) {
        console.error('Error resolving record:', err);
      } finally {
        setIsResolving(false);
      }
    }
  };

  return (
    <div className="border-t-2 border-gray-200 p-4">
      <div className="grid grid-cols-12 gap-4 items-start">
        {/* Order ID / Date */}
        <div className="col-span-2">
          <div className="text-xs text-gray-500 mb-1">Order ID / Date</div>
          <div className="font-semibold text-gray-900 text-sm">{error.orderId}</div>
          <div className="text-xs text-gray-600 mt-1">
            {error.dateSubmitted ? new Date(error.dateSubmitted).toLocaleDateString() : '—'}
          </div>
        </div>

        {/* Error Code / Message */}
        <div className="col-span-3">
          <div className="text-xs text-gray-500 mb-1">Error Code / Message</div>
          <div className="flex items-start gap-2">
            <span className="inline-block bg-gray-200 text-gray-900 text-xs font-medium px-2 py-0.5 rounded">
              {error.errorCode}
            </span>
          </div>
          <div className="text-sm text-gray-900 mt-1">{error.errorMessage}</div>
        </div>

        {/* Resolution Info */}
        <div className="col-span-2">
          <div className="text-xs text-gray-500 mb-1">Resolution Info</div>
          {error.status === 'Resolved' ? (
            <>
              <div className="text-xs text-gray-900">{error.resolvedBy || '—'}</div>
              <div className="text-xs text-gray-600 mt-0.5">
                {error.resolvedDate ? new Date(error.resolvedDate).toLocaleDateString() : '—'}
              </div>
            </>
          ) : (
            <div className="text-xs text-gray-600">—</div>
          )}
        </div>

        {/* HL7 Segment */}
        <div className="col-span-2">
          <div className="text-xs text-gray-500 mb-1">HL7 Segment</div>
          <div className="flex flex-wrap gap-1">
            {error.hl7Segment ? (
              <span className="inline-block bg-blue-100 text-blue-900 text-xs font-medium px-2 py-0.5 rounded">
                {error.hl7Segment}
              </span>
            ) : (
              <span className="text-xs text-gray-600">—</span>
            )}
          </div>
        </div>

        {/* User Comments and Action */}
        <div className="col-span-3">
          {error.status === 'Resolved' ? (
            <>
              <div className="text-xs text-gray-700 mb-2">{error.comments || '—'}</div>
              <div className="flex justify-center items-center gap-1 text-green-700 text-sm font-medium bg-green-100 rounded-md p-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs">Resolved</span>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="User comments..."
                disabled={isResolving}
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleResolve}
                disabled={!comment.trim() || isResolving}
                className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1"
              >
                {isResolving ? (
                  <>
                    <LoadingSpinner size="small" className="text-white" />
                    <span>Resolving...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                    </svg>
                    <span>Resolve</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ErrorRow;

