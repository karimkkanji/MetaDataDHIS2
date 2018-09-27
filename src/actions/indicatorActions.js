import config from "./config";

const headers = {
    headers: {
        'Authorization': `Basic ${btoa(config.username + ":" + config.password)}`
    }
};

export function fetchIndicators() {
    return function (dispatch) {
        fetch(config.url + 'indicators.json?paging=false&fields=:all', headers)
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