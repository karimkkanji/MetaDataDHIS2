export default function reducer(state = {
    expression: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch (action.type) {
        case 'FETCH_EXPRESSION': {
            return {...state, fetching: true} //curently fetching
        }
        case 'FETCH_EXPRESSION_REJECTED': {
            return {...state, fetching: false, error: action.payload} //error fetching
        }
        case 'FETCH_EXPRESSION_FULLFILLED': {
            return {...state, fetching: false, fetched: true, dataSet: action.payload} //fetching successful
        }
        default: {
            return {...state}
        }
    }

}