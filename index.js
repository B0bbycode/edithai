// Import the required libraries
const express = require('express');
const dialogflow = require('dialogflow');

// Set up the Dialogflow client
const client = new dialogflow.v2beta1.SessionsClient({
    credentials: {
        client_email: '<client_email>',
        private_key: '<private_key>'
    }
});
const sessionPath = client.sessionPath('<project_id>', '<session_id>');

// Set up the Express app
const app = express();

// Route to handle incoming messages
app.post('/message', (req, res) => {
    // Get the user's message from the request body
    const message = req.body.message;

    // Detect the user's intent with Dialogflow
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: 'en-US'
            }
        }
    };

    // Generate a response from Dialogflow
    client.detectIntent(request)
        .then(response => {
            const result = response[0].queryResult;
            // Return the AI response to the user
            res.send(result.fulfillmentText);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Start the Express app
app.listen(3000, () => {
    console.log('Chat bot listening on port 3000');
});
