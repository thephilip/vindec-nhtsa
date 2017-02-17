 /* vindex-nhtsa - Decode and Analyze VIN with NHTSA API
  * @param: app (an instance of vindec)
  * @return: mutated vindec instance
  */

'use strict';

//const parentRequire = module.parent.require;
const fetch = require('./lib/fetch.js');
const api = 'https://vpic.nhtsa.dot.gov/api'

let getEquipment = (vin) => {
	/* getEquipment - Retrieve vehicle equipment information
	 * @param: vin (vin object with model)
	 * @return: mutated vin object OR json
	 */

	 // @todo: construct api uri
	 // @todo: fetch and parse dataset
}

let getImages = (vin) => {
	/* getImages - Retrieve vehicle images or datus erratus
	 * @param: vin (vin object with model)
	 * @return: mutated vin object OR json
	 */

	 // @todo: construct api uri
	 // @todo: fetch and parse dataset
}

module.exports = (app) => {
	if (typeof app !== 'undefined' || typeof app !== 'object' || typeof app.decode !== 'function') {
		console.log('app: ', app);
		return new Error('Vindec object not passed or invalid argument.');
	}

	let oldDecode = app.decode;
	let vindecated = oldDecode(vin, (error, result) => {
		if (error) {
			console.log('Warning: vindec encountered error.\n\n', error.message);
		}
	});

	app.decode = (vin) => {
		let decodeExtended = '/vehicles/DecodeVinValuesExtended/';
		let params = vindecated.vin + '?format=json&modelyear=' + vindecated.year;
		let url = api + decodeExtended + params;

		vindecated.url = url;
		vindecated.fetch = (promise) => {
			return fetch(url);
		}
		return vindecated;
	}

	return app;
}