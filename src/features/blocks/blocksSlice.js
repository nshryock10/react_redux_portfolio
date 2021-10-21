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
            const {title, img, body} = action.payload;
            state.bigBlockInfo = {
                title: title,
                img: img,
                body: body
            }
        },
        setSearchResults: (state, action) => {
            const searchResults = action.payload;
            state.searchResults = searchResults.forEach( result => {
                return({
                    //Need to rename variables once reddit API is plugged in
                    key: result.key, 
                    title: result.title,
                    img: result.img,
                    body: result.body
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