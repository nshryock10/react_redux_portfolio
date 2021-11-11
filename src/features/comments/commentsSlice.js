import { createSlice } from '@reduxjs/toolkit';

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        seeComments: false,
        comments: []
    },
    reducers: {
        setCommentVisible: (state, action) => {
            state.seeComments = action.payload;
        },
        setComments: (state, action) => {
            const comments = action.payload;
            
            //Set current state to blank array
            state.comments = [];

            //Map json response to array
            comments.forEach(comment => state.comments.push(comment));
            console.log(state.comments);
        }
    }
})

//Define selectors
export const selectSeeComments = state => state.comments.seeComments;
export const selectComments = state => state.comments.comments;

//Define action creators
export const { setCommentVisible, setComments} = commentsSlice.actions;
export default commentsSlice.reducer;