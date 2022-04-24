
async function getData(url,options) {
    

    let response = await fetch(url, options);
    let data = await response.json();
    return data

};


export default getData;