import { configureStore } from '@reduxjs/toolkit';

// Placeholder reducer to prevent Redux warning
const placeholderReducer = (state = {}, action: any) => {
  return state;
};

export const store = configureStore({
  reducer: {
    placeholder: placeholderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;