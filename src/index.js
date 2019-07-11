const request = require('request');
const readline = require('readline');

const endpoint = 'https://brazilsouth.api.cognitive.microsoft.com/text/analytics/v2.1'
const language = 'en'

// You need to input your own keys
const key1 = '664b4d4e309848929cdd419d869f95aa'
const key2 = '56a76e1d661f43879b00c21907203b22'

headers = {
    'Ocp-Apim-Subscription-Key': key1,
    'Content-Type': 'application/json'
}

function logOutput(err, response, body) {
    if (err) {
        console.error(err)
    } else {        
        const response = JSON.parse(body);
        console.log(response.documents[0].score)
    }
}

function post(inputText, language) {
    const body = JSON.stringify({
        "documents": [
            {
                "id": "1",
                "text": inputText,
                "language": language
            }
        ]
    })
    var options = {
        url: endpoint + '/sentiment',
        method: 'POST',
        headers: headers,
        body: body,
    }
    request.post(options, logOutput)
}

function detectSentiment() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Type your text: ', (value) => {
        post(value, language);
        rl.close();
    });
}

detectSentiment()