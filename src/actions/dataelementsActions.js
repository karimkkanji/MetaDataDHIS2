const headers ={
    headers:{
        'Authorization': `Basic ${btoa('evanpersie3@gmail.com:skolastikA97')}`
}
};

export function fetchDataElements(){
    return function(dispatch){
        fetch('http://197.136.81.99:8082/test/api/26/dataElements.json?paging=false&fields=:all', headers)
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