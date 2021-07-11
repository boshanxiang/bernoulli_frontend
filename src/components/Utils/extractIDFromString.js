const extractIDFromString = (string) => {

    let output;
    let splitArray = string.split('/');

    for(let i = splitArray.length - 1; i >= 0; i--) {
        if((splitArray[i] === 'naturalpersons') || (splitArray[i] === 'legalentities')) {
            output = splitArray[i] + splitArray[i+1];
            console.log("URL to ID is:", output)    
            return output;
        }
    }
    
}

export default extractIDFromString;