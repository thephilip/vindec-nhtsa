# vindec-nhtsa
A Vindec plugin that returns a vin object with a property called fetch that is a pending Promise that, when settled, fetches the NHTSA data from a vehicle's manufacture year and VIN.

## Install via npm (or yarn)
[![NPM](https://nodei.co/npm/vindec-nhtsa.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/vindec-nhtsa)

## Returns original, vindec object (mutated)
When the decode method is called on a VIN, it returns the standard vindec decoded object, but
it also includes the URL of the API and the response data.  I may still sanitize some of the
data returned, but I may leave it as-is.  Any suggestions are greatly appreciated.

```javascript
// create and mutate 
const vindec = require('vindec');
const nhtsa = require('vindec-nhtsa')(vindec);

// decode and validate
let vin = nhtsa.decode('12345678901234567', (error, data) => {
	if (error) {
		console.log('Error: ', err.message);
	}
	return data;
});

// settle pending promise
vin.fetch().then((data) => {
	// fulfilled
	vin.nhtsa = JSON.parse(data);
    console.log('--NHTSAResults:\n', vin.nhtsa.Results);
}).catch((error) => {
	// rejected
    console.log('Danger, Will Robinson! Error:\n', error);
});
``` 
