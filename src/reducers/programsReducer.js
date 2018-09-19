export default function reducer(state = {
    programs: [],
    fetching: false,
    fetched: false,
    error: null,
}, action){
    switch(action.type){
        case 'FETCH_PROGRAMS': {
            return {...state, fetching: true} //curently fetching
        }
        case 'FETCH_PROGRAMS_REJECTED': {
            return {...state, fetching: false, error: action.payload} //error fetching
        }
        case 'FETCH_PROGRAMS_FULLFILLED': {
            //console.log('tuko hapa',action.payload.programs)
            return {...state, fetching: false, fetched: true, programs: action.payload.programs} //fetching successful
        }
        default: {
            return {...state}
        }
            
    }
   
}