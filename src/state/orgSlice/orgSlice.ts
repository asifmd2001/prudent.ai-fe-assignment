import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Organization } from './types';



const orgAdapter = createEntityAdapter<Organization>()

const initialState = orgAdapter.getInitialState()
export const orgSlice = createSlice({
    name: 'organization',
    initialState: initialState,
    reducers: {
        setOrganizations: (state, action: PayloadAction<Organization[]>) => {
            orgAdapter.setMany(state, action.payload)
        },
        setOrganization: (state, action: PayloadAction<Organization>) => {
            orgAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload
            })
        }
    },
});

export const { setOrganizations, setOrganization } = orgSlice.actions;

export default orgSlice.reducer;

