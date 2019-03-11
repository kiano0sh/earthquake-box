import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Map, TileLayer, Popup, CircleMarker } from 'react-leaflet'
import {lastWeekEarthquakeInSpecificAreaFetching} from'../actions/earthquake'


const DEFAULT_VIEWPORT = {
    center: [35.6892, 51.3890],
    zoom: 1,
};

export class MainMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: DEFAULT_VIEWPORT,
            all_earthquakes: this.props.all_earthquakes
        }
    }
    componentDidMount() {
        if (this.state.all_earthquakes === undefined && this.props.all_earthquakes !== undefined){
            this.setState({
                all_earthquakes: this.props.all_earthquakes
            })
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.all_earthquakes !== this.props.all_earthquakes) {
            this.setState({
                all_earthquakes: this.props.all_earthquakes
            })
        }

        if (prevProps.specific_earthquakes !== this.props.specific_earthquakes) {
            this.setState({
                specific_earthquakes: this.props.specific_earthquakes
            })
        }
    }

    onClickReset = (event) => {
        this.props.lastWeekEarthquakeInSpecificAreaFetching(event.latlng.lat, event.latlng.lng, 1000, 3)
    };

    onViewportChanged = (viewport) => {
        this.setState({ viewport })
    };

    render() {
        return (
            <Map
                onClick={(event) => this.onClickReset(event)}
                onViewportChanged={this.onViewportChanged}
                viewport={this.state.viewport}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                { this.state.all_earthquakes ?
                    this.state.all_earthquakes.features.map(element => {
                        return (
                            <CircleMarker
                                key={element.id}
                                center={[element.geometry.coordinates[1], element.geometry.coordinates[0]]}
                                color="red"
                                radius={Number(element.properties.mag) * 1.5}>
                                <Popup>ID: {element.id}<br/>Place: {element.properties.place}<br/>Magnitude: {element.properties.mag}</Popup>
                            </CircleMarker>
                        )
                    })
                    :
                    null
                }
                {
                    this.state.specific_earthquakes ?
                        this.state.specific_earthquakes.features.map(element => {
                            return (
                                <CircleMarker
                                    key={element.id}
                                    center={[element.geometry.coordinates[1], element.geometry.coordinates[0]]}
                                    color="blue"
                                    radius={Number(element.properties.mag) * 1.5}>
                                    <Popup>ID: {element.id}<br/>Place: {element.properties.place}<br/>Magnitude: {element.properties.mag}</Popup>
                                </CircleMarker>
                            )
                        })
                        :
                        null
                }
            </Map>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        all_earthquakes: state.earthquake.all_earthquakes,
        specific_earthquakes: state.earthquake.specific_earthquakes
    }
};

const mapDispatchToProps = {
    lastWeekEarthquakeInSpecificAreaFetching
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMap)
