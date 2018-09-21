import config from "./config";
const headers ={
    headers:{
        'Authorization': `Basic ${btoa(config.username+":"+config.password)}`
    }
};

export function fetchDataElements(){
    return function(dispatch){
        fetch(config.url+'/dataElements.json?paging=false&fields=:all', headers)
            .then(res => res.json())
            .then((response) => {
                dispatch({
                    type: 'FETCH_DATAELEMENTS_FULLFILLED',
                    payload: response});
                //console.log('dataelements fetched')
            })
            .catch((err) => {
                dispatch({ type: 'FETCH_DATAELEMENTS_REJECTED', payload: err })
            })
    }
}