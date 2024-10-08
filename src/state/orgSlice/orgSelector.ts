import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';


const selectEntities = (state: RootState) => state.organization.entities;

export const selectAllOrganization = createSelector(
    [selectEntities],
    (entities) => Object.values(entities ?? {})
);

export const selectOrganization = (state: RootState) => state.organization;