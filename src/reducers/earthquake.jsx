import {
    ALL_EARTHQUAKE_IN_LAST_WEEK_FETCHED,
    ALL_EARTHQUAKE_IN_AREA_FETCHED
} from '../types'


export default function auth(state = {}, action = {}) {
    switch (action.type) {
        case ALL_EARTHQUAKE_IN_LAST_WEEK_FETCHED:
            return {...state, all_earthquakes: action.mapData};
        case ALL_EARTHQUAKE_IN_AREA_FETCHED:
            return {...state, specific_earthquakes: action.mapData}
        default:
            return state;
    }
}
