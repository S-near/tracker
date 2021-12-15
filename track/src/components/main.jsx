import React from 'react';
import {useSelector} from "react-redux";

const Main = () => {
    const data = useSelector(state => state.data)
    const hidden = useSelector(state => state.hidden)
    const error = useSelector(state => state.error)
    return (
        <>
            { data ?
                    <main className={hidden ? 'main _main-hide' : 'main'}>
                        <section className="main__container">
                            {/* Ip address */}
                            <div className="main__block">
                                <h2 className="main__title">IP address</h2>
                                <p>{data.ip}</p>
                            </div>
                            {/* Location */}
                            <div className="main__block">
                                <h2 className="main__title">Location</h2>
                                <p>{data.location.city}, {data.location.country}</p>
                                <p>{data.location.geonameId}</p>
                            </div>
                            {/* Time zone */}
                            <div className="main__block">
                                <h2 className="main__title">Timezone</h2>
                                <p>UTC {data.location.timezone}</p>
                            </div>
                            {/* Isp */}
                            <div className="main__block">
                                <h2 className="main__title">ISP</h2>
                                <p>{data.isp}</p>
                            </div>
                        </section>
                    </main>
                    : null }
        {error ?
            <main className={hidden ? 'main _main-hide error-main' : 'main error-main'}>
                <h1 className={'main__error'}>IP Address not found</h1>
            </main>
        : null}
    </>
    );
};

export default Main;