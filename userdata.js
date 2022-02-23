import fetch from 'node-fetch';

const url = "https://teamtreehouse.com/larsgessner.json"

/* First with fetch */

fetch(url)
    .then(response => response.json())
    .then(user => printData(user.name, user.badges.length, user.points.total))

function printData(username, badges, points) {
    console.log(`${username} has ${badges} badges with ${points} points!`)
}