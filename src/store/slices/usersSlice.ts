import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UsersState {
  users: User[];
  loading: boolean;
}

const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@company.com',
    role: 'admin',
    lastLogin: new Date(),
    permissions: ['all'],
  },
  {
    id: '2',
    username: 'operator1',
    email: 'operator1@company.com',
    role: 'operator',
    lastLogin: new Date(Date.now() - 7200000),
    permissions: ['run_inspections', 'generate_reports'],
  },
  {
    id: '3',
    username: 'viewer1',
    email: 'viewer1@company.com',
    role: 'viewer',
    lastLogin: new Date(Date.now() - 86400000),
    permissions: ['view_dashboard'],
  },
];

const initialState: UsersState = {
  users: mockUsers,
  loading: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(u => u.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUsers, addUser, updateUser, removeUser, setLoading } = usersSlice.actions;
export default usersSlice.reducer;