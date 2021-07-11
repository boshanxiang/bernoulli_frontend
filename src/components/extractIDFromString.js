const extractIDFromString = (string) => {

    let output;
    let splitArray = string.split('/');

    for(let i = splitArray.length - 1; i >= 0; i--) {
        if(splitArray[i] === 'naturalpersons') {
            output = 'natural_person'+ splitArray[i+1];
            return output;
        } else if(splitArray[i] === 'legalentities') {
            output = 'legal_entity' + splitArray[i+1];
            return output;
        }
    }
}

export default extractIDFromString;