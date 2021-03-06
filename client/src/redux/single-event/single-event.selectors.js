import {createSelector} from 'reselect';

const selectEvent = state => state.event;

export const selectEventName = createSelector(
    [selectEvent],
    event => event.name
)

export const selectIsLoading = createSelector(
    [selectEvent],
    event => event.isLoading
)