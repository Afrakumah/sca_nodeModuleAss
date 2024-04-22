//importing the https, file and path modules
const https = require("https");
const fs = require("fs");
const path = require("path");

const url = "https://en.wikipedia.org/wiki/Tunde_Onakoya";
//declaring path to output response using the join method
const output = path.join(__dirname, "public", "output.html");

//method under fs module used to write the data from the url or https to output file for live server
const fileStream = fs.createWriteStream(output);

https
  .get(url, (response) => {
    console.log("statusCode:", response.statusCode);
    console.log("headers:", response.headers);

    //.on is event listener to listen for data
    response.on("data", (data) => {
      //output data to variable filestream
      fileStream.write(data);
    });

    //listening for the end of the response
    response.on("end", () => {
      console.log("Data has been written to", output);

      //end the file stream after output to .html file
      fileStream.end();
      console.log('Response has been fully received.'); // Log when response is fully received
    });


    // Listening for the 'complete' event using the http.incomingmessage class
    //response.on("complete", () => {
    //   console.log("Response has been fully received.");
    // });

    

    // Listening for the 'close' event and log a message
    response.on("close", () => {
      console.log("Connection to the server has been closed.");
    });

    //log error encoutered while making request
  })
  .on("error", (error) => {
    console.error("Error:", error);
  });
