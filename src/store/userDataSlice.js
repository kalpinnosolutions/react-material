import { createSlice } from '@reduxjs/toolkit'

const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
        userpnno: '',
        userData: '',
        passNo: ''
    },
    reducers: {
        setUserData: (state, action) => {
            state.userpnno = action.payload
        },
        setUserAllData: (state, action) => {
            state.userData = action.payload
        },
        setUserPassNo: (state, action) => {
            state.passNo = action.payload
        }
    }
});

export const { setUserData, setUserAllData, setUserPassNo } = userDataSlice.actions;
export default userDataSlice.reducer;

