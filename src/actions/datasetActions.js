import config from "./config";

const headers ={
    headers:{
        'Authorization': `Basic ${btoa(config.username+":"+config.password)}`
    }
};


export function fetchDataSets(){
    return function(dispatch){
        fetch(config.url+'dataSets.json?paging=false&fields=:all', headers)
            .then(res => res.json())
            .then((response) => {
                dispatch({
                    type: 'FETCH_DATASET_FULLFILLED',
                    payload: response
                });
                //console.log('datasets fetched')
            })
            .catch((err) => {
                dispatch({
                    type: 'FETCH_DATASET_REJECTED',
                    payload: err
                })
            })
    }
}