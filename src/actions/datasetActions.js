const headers ={
    headers:{
        'Authorization': `Basic ${btoa('evanpersie3@gmail.com:skolastikA97')}`
}
};


export function fetchDataSets(){
    return function(dispatch){
        fetch('http://197.136.81.99:8082/test/api/26/dataSets.json?paging=false&fields=:all', headers)
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