import React, {useEffect} from 'react';
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import * as L from "leaflet";
import markerIcon from "../images/icon-location.svg";
import {useDispatch, useSelector} from "react-redux";
import {setHiddenAction} from "../store/reducer";

const Map = () => {
    const dispatch = useDispatch()

    const position = useSelector(state => state.position)
    const hidden = useSelector(state => state.hidden)

    useEffect(() => {
        let zoomButtonsIn = document.querySelector('.leaflet-control-zoom-in')
        let zoomButtonsOut = document.querySelector('.leaflet-control-zoom-out')

        const handleZoomClick = () => dispatch(setHiddenAction(true))
        zoomButtonsIn.addEventListener('click', handleZoomClick)
        zoomButtonsOut.addEventListener('click', handleZoomClick)
    }, [])

    function LocationMarker() {
        const map = useMapEvents({})
        window.addEventListener('keydown', (event) => {
            if(event.key === 'Escape') {
                map.flyTo(position, 15)
            }
        })

        useEffect(() => {
            if(map.options.center !== position) {
                map.flyTo(position, 15, {
                    animate: true,
                    duration: 4,
                })
                map.options.center = position
            }
        }, [position])

        let blackIcon = L.icon({
            iconUrl:markerIcon,
            iconSize: [36, 46],
        })

        return position === null ? null : (
            <Marker
                position={position}
                icon={blackIcon}
            >
                <Popup>IP address</Popup>
            </Marker>
        )
    }

    const hideHead = () => {
        if(hidden){
            window.scrollTo({
                top: 0,
                behavior:'smooth',
            })
            dispatch(setHiddenAction(false))
        } else{
            dispatch(setHiddenAction(true))
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior:'smooth',
            })
        }
    }
    return (
        <>
        <footer className={hidden ? 'footer _footer-show' : 'footer'}>
            <MapContainer
                center={position} zoom={15}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker/>
            </MapContainer>
        </footer>
            <button type="button" aria-label={'Hide information'} onClick={() => hideHead()} className={ hidden ? 'hide-head active' : 'hide-head' }>
                <span className={hidden ? 'hide__arrow active' : 'hide__arrow'}/>
            </button>
        </>

    );
};

export default Map;