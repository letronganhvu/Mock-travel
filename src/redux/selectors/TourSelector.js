import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const tourSelector = (state) => state.Tour;

const selectTourSelector = createSelector(
    tourSelector,
    state => state.tours);
/** function */
export const selectTours = (state) => {
    return selectTourSelector(state);
}



