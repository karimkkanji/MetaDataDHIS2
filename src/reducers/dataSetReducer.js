export default function reducer(state = {
    dataSet: [],
    fetching: false,
    fetched: false,
    error: null,
}, action){
    switch(action.type){
        case 'FETCH_DATASET': {
            return {...state, fetching: true} //curently fetching
        }
        case 'FETCH_DATASET_REJECTED': {
            return {...state, fetching: false, error: action.payload} //error fetching
        }
        case 'FETCH_DATASET_FULLFILLED': {
            return {...state, fetching: false, fetched: true, dataSet: action.payload} //fetching successful
        }
        default: {
            return {...state}
        }
    }
   
}