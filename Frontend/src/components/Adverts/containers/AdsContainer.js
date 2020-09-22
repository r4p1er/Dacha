import React, {Component} from 'react';
import { Adverts } from "../components/Adverts";
import connect from "react-redux";


export class AdvertsContainer extends Component {
    render(){
        return(
             <Adverts />
        );
    }

}

const mapStateToProps = (state) => {
    return{
        state
    }
}

const mapDispatchToProps = (dispatch) => {
    return{}
}

const AdsContainer = connect(mapStateToProps, mapDispatchToProps)(Adverts);

export default AdsContainer;
