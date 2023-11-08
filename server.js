// node core modules
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
// npm modules
const format = require('date-fns/format');
const express = require("express");

const app = express();

const PORT = process.env.PORT || 8070;

const timestamp = format(new Date(), "yyyy-MM-dd_HH-mm-ss");
const folderPath = path.join(__dirname, "textFile");
const fileName = `${timestamp}.txt`;
const content = timestamp;

// Create a new file contoller
const createFile = async (req, res) => {
    try {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath)
            console.log("Created a new folder");
        }

        await fsPromises.writeFile(`${folderPath}/${fileName}`, content)
        res.sendStatus(201); // Created Successfully
    } catch (error) {
        console.error(error);
    }
}

// Read files in a directory controller
const readFiles = async (req, res) => {
    try {

        const files = await fsPromises.readdir(folderPath);

        res.status(200).json({ "files retrieved": files });

    } catch (error) {
        console.log(error)
    }

}

// Routes
// Create file route
app.post("/", createFile);
// Retrieve files route
app.get("/", readFiles);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})