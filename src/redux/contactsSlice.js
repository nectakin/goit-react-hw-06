
import { createSlice, nanoid } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  items: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: {
      reducer: (state, { payload }) => {
        state.items.push(payload);
      },
      prepare: contact => {
        return { payload: { ...contact, id: nanoid() } };
      },
    },
    deleteContact: (state, { payload }) => {
      state.items = state.items.filter(({ name }) => name !== payload);
    },
  },
  selectors: {
    selectContacts: state => state.items,
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['items'],
};

export const contactsReducer = persistReducer(persistConfig, contactsSlice.reducer);
export const { addContact, deleteContact } = contactsSlice.actions;
export const { selectContacts } = contactsSlice.selectors;
