import { createSlice } from '@reduxjs/toolkit';
import { GAMEMODE } from '../Constant/Constant';

export const gameSlice = createSlice({
    name: "game",
    initialState: {
        code: [
            "red", 
            "blue", 
            "green", 
            "yellow"
        ],
        type: GAMEMODE.CLASSIC
    },
    reducers: {
        tryCode: (state, action) => {
            console.log("try");
            state.code = action.payload;

        }
    }
});

export const { tryCode } = gameSlice.actions;
export default gameSlice.reducer;