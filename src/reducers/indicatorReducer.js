export default function reducer(state = {
    indicators: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch (action.type) {
        case 'FETCH_INDICATORS': {
            return {...state, fetching: true} //curently fetching
        }
        case 'FETCH_INDICATORS_REJECTED': {
            return {...state, fetching: false, error: action.payload} //error fetching
        }
        case 'FETCH_INDICATORS_FULLFILLED': {
            return {...state, fetching: false, fetched: true, indicators: action.payload} //fetching successful
        }
        default: {
            return {...state}
        }
    }

}