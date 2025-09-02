import React from 'react';
import { UserManagement } from '../components/users/UserManagement';

export const Users: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600">Manage user accounts and permissions</p>
      </div>

      <UserManagement />
    </div>
  );
};