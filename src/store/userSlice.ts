
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
});

interface Address {
  street: string;
  city: string;
  zipcode: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
}

interface UsersState {
  data: User[];
  selectedUser: User | null;
  isUserDetailsVisible: boolean;
  isEditing: boolean;
  sortDirectionCity: 'asc' | 'desc';
  sortDirectionCompany: 'asc' | 'desc';
}

const initialState: UsersState = {
  data: [],
  selectedUser: null,
  isUserDetailsVisible: false,
  isEditing: false,
  sortDirectionCity: 'asc',
  sortDirectionCompany: 'asc',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
      state.isUserDetailsVisible = true;
    },
    handleBackToList: (state) => {
      state.selectedUser = null;
      state.isUserDetailsVisible = false;
      state.isEditing = false;
    },
    toggleEdit: (state) => {
      state.isEditing = !state.isEditing;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const updatedUser = action.payload;
      state.data = state.data.map((user) => (user.id === updatedUser.id ? updatedUser : user));
      state.selectedUser = updatedUser;
      state.isEditing = false;
    },
    sortByCity: (state) => {
      state.data = state.data.slice().sort((a, b) => {
        const comparison = a.address.city.localeCompare(b.address.city);
        return state.sortDirectionCity === 'asc' ? comparison : -comparison;
      });
      state.sortDirectionCity = state.sortDirectionCity === 'asc' ? 'desc' : 'asc';
    },
    sortByCompany: (state) => {
      state.data = state.data.slice().sort((a, b) => {
        const comparison = a.company.name.localeCompare(b.company.name);
        return state.sortDirectionCompany === 'asc' ? comparison : -comparison;
      });
      state.sortDirectionCompany = state.sortDirectionCompany === 'asc' ? 'desc' : 'asc';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.data = action.payload;
    });
  },
});

export const { selectUser, handleBackToList, toggleEdit, updateUser, sortByCity, sortByCompany } = usersSlice.actions;
export default usersSlice.reducer;
