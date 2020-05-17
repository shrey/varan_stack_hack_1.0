import {createSelector} from 'reselect';

const selectAdmin = state => state.admin;

export const selectAdminPresent = createSelector(
    [selectAdmin],
    admin => admin.isAdmin
)