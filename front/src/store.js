import { configureStore } from '@reduxjs/toolkit';
import gameSlice from './Slices/gameSlice';
import chatSlice from './Slices/chatSlice';

export const store = configureStore({
    reducer: {
        game: gameSlice,
        chat: chatSlice
    }
})