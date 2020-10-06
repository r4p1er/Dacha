import React from 'react';
import {useSelector} from 'react-redux';
import LoaderGif from '../../additions/LoaderGif.gif';
import {Image} from "react-bootstrap";

const FullPageLoader = () => {

    const {loading} = useSelector((state) => state.app.loading);

    if (!loading) return null;

    return (
        <div className="loader-container">
            <div className="loader">
                <Image src={LoaderGif}/>
            </div>
        </div>
    );
}

export default FullPageLoader;
