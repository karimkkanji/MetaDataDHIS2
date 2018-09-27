
export default function reducer(state = {
    programDataElements: [],
    fetching: false,
    fetched: false,
    error: null,
}, action){
    switch(action.type){
        case 'FETCH_PROGRAMDATAELEMENTS': {
            return {...state, fetching: true} //curently fetching
        }
        case 'FETCH_PROGRAMDATAELEMENTS_REJECTED': {
            return {...state, fetching: false, error: action.payload} //error fetching
        }
        case 'FETCH_PROGRAMDATAELEMENTS_FULLFILLED': {
            return {...state, fetching: false, fetched: true, programDataElements: action.payload} //fetching successful
        }
        default: {
            return {...state}
        }
    }
    
}