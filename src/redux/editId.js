import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editId: null
}

export const editIdSlice = createSlice({
  name: 'editId',
  initialState,
  reducers: {
    setEditId: (state, action) => {
      state.editId = action.payload
    }
  }
})

export const selectEditId = (state) => state.editId.editId

export const { setEditId } = editIdSlice.actions

export default editIdSlice.reducer