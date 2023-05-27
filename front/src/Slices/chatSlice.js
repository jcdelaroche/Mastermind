import { createSlice } from '@reduxjs/toolkit';
import { GAMEMODE } from '../Constant/Constant';

export const chatSlice = createSlice({
    name: "chat",
    initialState: {
        messages: [
            "Hello, I'm a bot. I'm here to help you with your game.",
        ],
    },
    reducers: {
        newMessage: (state, action) => {
            console.log("Nouveau message");
            state.messages.push(action.payload);
        },
        receiveMessage: (state, action) => {
            console.log("Message reçu");
            state.messages.push(action.payload);
        }
    }
});

export const { newMessage, receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;