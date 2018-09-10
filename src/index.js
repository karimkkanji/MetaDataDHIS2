import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {combineReducers,createStore} from 'redux';
import registerServiceWorker from './registerServiceWorker';

function tabsReducer(state='',action){
    return state;
}
function itemsReducer(state ='', action) {
    return state;
}
const allReducers = combineReducers({
   tab: tabsReducer,
   items: itemsReducer
});
const store  = createStore(allReducers,{
    tab:'0',
    items:''
});
console.log(store.getState());

ReactDOM.render(<App /> , document.getElementById('root'));
registerServiceWorker();
