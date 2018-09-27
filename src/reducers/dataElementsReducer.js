export default function reducer(state = {
    dataElements: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch (action.type) {
        case 'FETCH_DATAELEMENTS': {
            return {...state, fetching: true} //curently fetching
        }
        case 'FETCH_DATAELEMENTS_REJECTED': {
            return {...state, fetching: false, error: action.payload} //error fetching
        }
        case 'FETCH_DATAELEMENTS_FULLFILLED': {
            return {...state, fetching: false, fetched: true, dataElements: action.payload} //fetching successful
        }
        default: {
            return {...state}
        }
    }

}