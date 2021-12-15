import React, {useEffect} from 'react';
import {setDataAction, setErrorAction, setPositionAction} from "../store/reducer";
import axios from "axios";
import {geoKey} from "../key";
import {useDispatch, useSelector} from "react-redux";

const Header = () => {
    const error = useSelector(state => state.error)
    const dispatch = useDispatch()

    useEffect(() => {
        // Reset scroll for better experience
        window.onunload = () => window.scrollTo(0, 0)

        let form = document.querySelector('.header__form')
        form.addEventListener('submit', (event) => {
            event.preventDefault()
            dispatch(setErrorAction(false))
            const value = document.querySelector('.header__input').value
            let arrow = document.querySelector('.header__arrow')
            arrow.classList.add('loading-arrow')
            axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${geoKey}&ipAddress=${value}`)
                .then(res => {
                    arrow.classList.remove('loading-arrow')
                    dispatch(setDataAction(res.data))
                    let newPosition = [res.data.location.lat, res.data.location.lng]
                    dispatch(setPositionAction(newPosition))
                })
                .catch((err) => {
                    dispatch(setErrorAction(true))
                    arrow.classList.remove('loading-arrow')
                })
        })
        // Get user IP
        axios.get("https://geolocation-db.com/json/")
            .then(res => {
                const ip = res.data.IPv4
                document.querySelector('.header__input').value = ip
                document.querySelector('.header__submit').click()
            })
    }, [])

    return (
        <header className="header">
            <div className="header__container">
                <h1 className={'header__title'}>IP Address tracker</h1>
                <form action="" aria-label={"Search an IP"} className={'header__form'}>
                    <input type={'text'}
                           className={'header__input'}
                           aria-label={'Search for any IP address or domain'}
                           placeholder={'Search for any IP address or domain'}
                    />
                    <button type={'submit'}
                            className={error
                                ? 'header__submit header__error'
                                : 'header__submit'}
                            aria-label={'Search'}>
                        <span className={'header__arrow'}/>
                    </button>
                </form>
            </div>
        </header>
    );
};

export default Header;