const os = require('os');
const fs = require('fs');
const path = require('path');

// Define the paths for the output file
const output = path.join(__dirname, 'public', 'myOS.md');

// Execute the OS commands and get their output
const arch = os.arch();
const uptimeInSeconds = os.uptime();
const uptimeFormatted = formatUptime(uptimeInSeconds);
const homedir = os.homedir();

// Create the Markdown content
const myOS = `
OS Information:

Architecture: ${arch}

Uptime: ${uptimeFormatted}

Home Directory: ${homedir}
`;

// Write the os content to the output file
fs.writeFile(output, myOS, (err) => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log('myOS information has been written to', output);
  }
});

// Function to format uptime in days, hours, and seconds
function formatUptime(uptimeInSeconds) {
  const days = Math.floor(uptimeInSeconds / (3600 * 24));
  const hours = Math.floor((uptimeInSeconds % (3600 * 24)) / 3600);
  const seconds = Math.floor(uptimeInSeconds % 3600);

  return `${days} days ${hours} hours ${seconds} seconds`;
}