const request = require('request');

const getGeoXY = (addr,callback) => {
	//console.log('Heel')
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+addr+'.json?access_token=pk.eyJ1Ijoidmx0ZWNobm8iLCJhIjoiY2sxcDZxcWs3MHR3aTNjcWRnM3ppYXA1aSJ9.xxoRu5F0oUzVihzbdf-CbQ&limit=1'
    request({
    	url: url
    },(err,res)=>{
    	//console.log('HELLO')
    	const data = JSON.parse(res.body);
 		if(err) {
			callback('Cannot connect to Server !',undefined);
		}else if(data.features.length === 0) {
			callback('Unable to find location. Try another name !',undefined);
		}else {
			callback(false, 
			{
				latitude   : data.features[0].center[1],
				longtitude : data.features[0].center[0],
				location   : data.features[0].place_name

			});
		}	
    });	
}

const weatherFC = (addr,callback) => {
	//console.log('Heel')
	const url = 'https://api.darksky.net/forecast/534937f2e1d86ac3e3b20fd9f1d674e2/'+addr.latitude+','+addr.longtitude+'?lang=vi&units=si';
	//console.log(url);

    request({
    	url: url
    },(err,res)=>{
    	//console.log('HELLO')
    	const data = JSON.parse(res.body);
 		if(err) {
			callback('Cannot connect to Server !',undefined);
		}else if(data.error) {
			callback('Unable to find location. Try another name !',undefined);
		}else {
			callback(false, 
			{
				summary: data.currently.summary,
				temperature: data.currently.temperature,
				humidity: data.currently.humidity,
				location: addr.location
			})
		}	
    });	
}


module.exports = {
	getGeoXY,
	weatherFC
}