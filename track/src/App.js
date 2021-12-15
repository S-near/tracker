import React from 'react';
import "./App.scss"
import Map from "./components/map";

import Main from "./components/main";
import Header from "./components/header";


const App = () => {


    return (

        <>
            {/* Header */}
            <Header/>
            {/* Main */}
            <Main/>
            {/* Footer */}
            <Map/>

        </>
    );
};

export default App;


