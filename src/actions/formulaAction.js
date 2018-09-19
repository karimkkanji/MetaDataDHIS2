const headers ={
    headers:{
        'Authorization': `Basic ${btoa('evanpersie3@gmail.com:skolastikA97')}`
    }
};
export function fetchformulaAction(expression) {
    expression = expression.replace(/#/g, "%23");
    expression = expression.replace(/{/g, "%7B");
    expression = expression.replace(/}/g, "%7D");
    expression = expression.replace(/\s/g, "%20");
    expression = expression.replace(/\+/g, "%2B");
    fetch('http://197.136.81.99:8082/test/api/26/expressions/description.json?expression=' + expression, headers)
        .then(
            function (response) {
                return response.json();
            }
        ).then(function (jsonData) {
        //handle json data processing here
       return jsonData.description;
    })
}