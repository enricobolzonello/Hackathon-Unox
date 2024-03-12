const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const spawn = require("child_process").spawn;
const fs = require('fs');

filePath = 'example.txt';

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static(__dirname));

app.use(express.json());

app.post("/faccioqualcosa", (req, res) => {

    try {
        const receivedCommand = req.body.data;
        console.log(receivedCommand);

        const pythonProcess = spawn('python',["./python/main2.py", receivedCommand]);
    
        pythonProcess.stdout.on('data', (data) => {
            console.log(`Received chunk ${data}`);

            fs.writeFile(filePath, data, (err) => {
                if (err) {
                  console.error('Error writing to file:', err);
                } else {
                  console.log('Data has been written to the file successfully!');
                }
              });
        });

        res.json({ message: 'String received successfully' });
    } catch (error) {
        console.error('Error processing the request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});


app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

