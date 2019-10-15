
// ***************************//
// ***************************//
// ***************************//
// ***************************//
// ***************************//
// ***************************//
// ***************************//

const express = require('express');
const path = require('path');
const hbs  = require('hbs');
const utils = require('./weather/utils.js')
/*console.log(__dirname);
console.log(__filename);*/
const app = express();
const publicPath = path.join(__dirname,'../public');

app.use(express.static(publicPath)) ;
// hbs settting
const viewsPath = path.join(__dirname,'../template/views');
const partialsPath = path.join(__dirname,'../template/partials');
const cssPath = path.join(__dirname,'../css');


app.set('views',viewsPath) ;
app.set('view engine','hbs') ;

hbs.registerPartials(partialsPath);


app.get('',(req,res)=>{
	res.render('index',{
		trademark: 'VLTECHNO\u2122',
		title: 'GrownMartinUp',

		//boostrap : boostrapPath+'\\bootstrap.min'
	});
});

app.get('/game',(req,res)=>{
	res.render('game',{
		trademark: 'VLTECHNO\u2122',
		title: 'GrownMartinUp',
	});
});


app.get('/weather',(req,res)=>{
	const getGeoXY = utils.getGeoXY;
	const weatherFC = utils.weatherFC;

	if(!req.query.location){
		res.render('weather',{
			trademark: 'VLTECHNO\u2122',
			title: 'GrownMartinUp',
		});
	}else {
		getGeoXY(req.query.location,(err,data)=>{
			if(err)  {
				console.log(err);
			}else {

				weatherFC(data,(err,infor)=>{
					if(err){
						console.log(err);
					}else {
						//res.send(infor.location +' has '+infor.summary+' with temperature around '+infor.temperature+' celciuse degree and humidity '+infor.humidity*100+'%')					
						res.send({
							location    : infor.location,
							summary    : infor.summary,
							temperature : infor.temperature,
							humidity    : infor.humidity*100
						})					
						//console.log(infor.location +' has '+infor.summary+' with temperature around '+infor.temperature+' celciuse degree and humidity '+infor.humidity*100+'%');
					}
				})
			}
		});

	}
});



app.get('*',(req,res)=>{
	res.send('ERROR 404, this page doesn\'t exist');
})
//console.log(express.static(publicPath));

// index.html
// game.html
// weather.html
// help.html


app.listen(3000,()=>{

	console.log('Server is up!@port=3000');
})
