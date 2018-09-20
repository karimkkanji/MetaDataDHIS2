const headers ={
    headers:{
        'Authorization': `Basic ${btoa('evanpersie3@gmail.com:skolastikA97')}`
}
};


export function fetchIndicators(){
    return function(dispatch){
        fetch('http://197.136.81.99:8082/test/api/26/indicators.json?paging=false&fields=:all', headers)
        .then(res => res.json())
        .then((response) => {
            dispatch({ 
                type: 'FETCH_INDICATORS_FULLFILLED', 
                payload: response
            });
            //console.log('indicators fetched')
        })
        .catch((err) => {
            dispatch({ 
                type: 'FETCH_INDICATORS_REJECTED', 
                payload: err 
            })
        })
    }
}