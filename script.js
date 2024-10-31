
/**
 * 
 * @param {string} url 
 */
async function fetchData(url) {
    try {
        const response = await fetch(url);
    } catch(error) {
        console.error(error);
    }
}