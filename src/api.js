import axios from "axios";

let currentDay = new Date();

function getLastWeek() {
    let today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
}

function getLastMonth() {
    let today = new Date();
    return new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
}

export default {
    earthquake: {
        getAllEarthQuakesInLastWeek: (minDate, maxDate) =>
            axios.get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&
            starttime=${getLastWeek().toDateString()}&
            endtime=${currentDay.toDateString()}`).then(res => res.data),
        getSpecificEarthQuakesInLastMonth: (latitude, longitude, km, minmagnitude) =>
            axios.get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&
            starttime=${getLastMonth().toDateString()}&
            endtime=${currentDay.toDateString()}&
            latitude=${latitude}&
            minmagnitude=${minmagnitude}&
            longitude=${longitude}&
            maxradiuskm=${km}`).then(res => res.data),
    },
};
