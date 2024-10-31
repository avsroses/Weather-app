
/**
 * 
 * @param {string} url 
 */
async function fetchData(url) {
    try {
        const response = await fetch(url);

        // check response is ok
        if(!response.ok) {
            throw new Error("Response Status: ", response.status);
        }

        // obtain json
        const json = await response.json();
        console.log(json);

    } catch(error) {
        console.error(error);
    }
}