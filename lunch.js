const lunchItems = require("./lunch.json");

const client = require("./index.js");

//console.log(lunchItems[getDate()]);

function getDate(){
    let monthArray = ["jan", 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    let currentdate = new Date("May 2 2024");
    let monIndex = currentdate.getMonth();
    let day = currentdate.getDate().toString().padStart(2, '0')
    return monthArray[monIndex] + " " + day;
}

function sendMessage(){
    let lunch = lunchItems[getDate()];
    let message = `Todays lunch is: **${lunch}**`;
    const channel = client.client.channels.cache.get('912873618713763931');
    channel.send(message);
}

function constantCheck(){
    let time = new Date("September 6, 2024 22:37:00").toTimeString().substring(0, 5);
    console.log(time);
    if (time == "22:37") sendMessage();
}

async function loggedIn(){
    while (true){
        constantCheck();
        await new Promise(r => setTimeout(r, 60000));
    }
}

async function run() {
    //client.client.login(client.token);
    client.client.once(client.Events.ClientReady, client => {
        console.log(`Logged in as ${client.user.tag}`);
        loggedIn();
    });
}

run();
