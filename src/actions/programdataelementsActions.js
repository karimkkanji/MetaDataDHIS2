import config from "./config";
const headers ={
    headers:{
        'Authorization': `Basic ${btoa(config.username+":"+config.password)}`
    }
};

export function fetchProgramDataElements(){
    return function(dispatch){
        fetch(config.url+'/programDataElements.json?paging=false&fields=:all', headers)
            .then(res => res.json())
            .then((response) => {
                dispatch({
                    type: 'FETCH_PROGRAMDATAELEMENTS_FULLFILLED',
                    payload: response});
                console.log('program dataelements fetched')
            })
            .catch((err) => {
                dispatch({ type: 'FETCH_PROGRAMDATAELEMENTS_REJECTED', payload: err })
            })
    }
}