// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Action asynchrone pour l'inscription
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, thunkAPI) => {
  try {
    // Envoyez les données d'inscription à votre API côté serveur
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    // Gérez la réponse de l'API et renvoyez les données si l'inscription réussit
    if (response.ok) {
      return data;
    } else {
      // Si l'inscription échoue, l'API peut renvoyer un message d'erreur
      return thunkAPI.rejectWithValue(data.message);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue('Erreur serveur');
  }
});

// Créez un slice Redux pour gérer l'état de l'authentification
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;


