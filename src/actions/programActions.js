import config from "./config";

const headers = {
    headers: {
        'Authorization': `Basic ${btoa(config.username + ":" + config.password)}`
    }
};

export function fetchPrograms() {
    return function (dispatch) {
        fetch(config.url + 'programs.json?paging=false&fields=:all', headers)
            .then(res => res.json())
            .then((response) => {
                dispatch({
                    type: 'FETCH_PROGRAMS_FULLFILLED',
                    payload: response
                });
                //console.log('programs fetched');
            })
            .catch((err) => {
                dispatch({
                    type: 'FETCH_PROGRAMS_REJECTED',
                    payload: err
                })
            })
    }
}