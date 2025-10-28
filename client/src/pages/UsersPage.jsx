import { useState, useEffect } from 'react';
import { get, post } from '../utils/api';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await get('/users');
      setUsers(data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users. Make sure the server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await post('/users', formData);
      setFormData({ name: '', email: '' });
      fetchUsers(); // Refresh the list
    } catch (err) {
      setError('Failed to create user.');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Olis Tracker - Users</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Manage your users</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Add User Form */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">Add New User</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Add User
            </button>
          </form>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">Users List</h2>
          
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
              <p className="text-gray-500 mt-2">Loading users...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {!loading && !error && users.length === 0 && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">👤</div>
              <p className="text-gray-500">No users found. Add one above!</p>
            </div>
          )}
          
          {!loading && users.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="bg-linear-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{user.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{user.email}</p>
                  <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded">
                    ID: {user.id}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UsersPage;

