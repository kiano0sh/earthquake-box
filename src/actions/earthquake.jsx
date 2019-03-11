import {
    ALL_EARTHQUAKE_IN_LAST_WEEK_FETCHED,
    ALL_EARTHQUAKE_IN_AREA_FETCHED
} from "../types";
import api from '../api'

export const allEarthquakeFetched = mapData => ({
    type: ALL_EARTHQUAKE_IN_LAST_WEEK_FETCHED,
    mapData
});

export const lastWeekEarthquakeFetched = mapData  => ({
    type: ALL_EARTHQUAKE_IN_AREA_FETCHED,
    mapData
});

export const initializeMap = () => (dispatch) => {
    dispatch(allEarthquakeInLastWeekFetching());
};


export const allEarthquakeInLastWeekFetching = () => dispatch => {
    api.earthquake.getAllEarthQuakesInLastWeek().then(res =>
        dispatch(allEarthquakeFetched(res)))
};

export const lastWeekEarthquakeInSpecificAreaFetching = (latitude, longitude, km, minmagnitude) => dispatch => {
    api.earthquake.getSpecificEarthQuakesInLastMonth(latitude, longitude, km, minmagnitude).then(res =>
        dispatch(lastWeekEarthquakeFetched(res)))
};
