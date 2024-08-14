/* This will copy _redirects file to generated static files folder. The _redirects file specific on this code is
for redirect to 404.html page if some path not found and not return to default IPFS page.
This code called on packages.json at time execute npm run deploy */

const fs = require('fs');

const sourceFilePath = 'src/components/pages/_redirects';
const destinationFilePath = 'build/_redirects';

fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
	if (err) {
		console.error('Error copying file:', err);
	} else {
		console.log('File copied successfully, waiting for upload data to IPFS');
	}
});
