import fetch from 'node-fetch';
import https from 'https';

const username = "larsgessner"
const url = `https://teamtreehouse.com/${username}.json`

/* 1. Using fetch request */

fetch(url)
    .then(response => {
        console.log("Fetch Status:", response.status)
        return response
    })
    .then(response => response.json())
    .then(user => printData(user.name, user.badges.length, user.points.total))


/* 2. Using HTTPs request */

https.get(url, (response) => {
    console.log("HTTPs Status:", response.statusCode)
    let body = ""
    response.on("data", data => {
        body += data.toString();
    })

    response.on("end", () => {
        const user = JSON.parse(body)
        printData(user.name, user.badges.length, user.points.total)
    })
})


function printData(username, badges, points) {
    console.log(`${username} has ${badges} badges with ${points} points!`)
}
