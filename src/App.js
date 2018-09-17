import React,{Component} from 'react';
import Store from './Store';
import Layout from './components/Layout'
import {Provider} from 'react-redux'
import './App.css';

export default class source extends Component {
    render() {
        return (

            <Provider store={Store}>

                <div>
                    <Layout/>
                </div>

            </Provider>
        )
    }
}
