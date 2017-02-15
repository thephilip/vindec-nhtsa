# vindec-nhtsa
###### A Vindec Plugin

## Install via npm or yarn
    $ npm install vindec-nhtsa

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
	// response is JSON
	vin.nhtsa = JSON.parse(data);
	// fulfilled
    console.log('data:\n', vin.nhtsa);
}).catch((error) => {
	// rejected
    console.log('Danger, Will Robinson! Error:\n', error);
});
``` 
