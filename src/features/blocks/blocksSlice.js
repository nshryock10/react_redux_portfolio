import { createSlice } from '@reduxjs/toolkit';

const blocksSlice = createSlice({
    name: 'blocks',
    initialState: {
        blockSize: 'small',
        bigBlockInfo: {}
    },
    reducers: {
        setSize: (state, action) => {
            state.blockSize = action.payload;
        },
        setBigBlockInfo: (state, action) => {
            state.bigBlockInfo = {
                data: action.payload.data
            }
        },
        setSearchResults: (state, action) => {
            const searchResults = action.payload;
            state.searchResults = searchResults.forEach( result => {
                return({
                    //Need to rename variables once reddit API is plugged in
                    data: action.payload
                })
            })
        }
    }
});

//Define selectors
export const selectBlockSize = state => state.blocks.blockSize;
export const selectBigBlockInfo = state => state.blocks.bigBlockInfo;

export const { setSize, setBigBlockInfo, setSearchResults } = blocksSlice.actions;
export default blocksSlice.reducer;