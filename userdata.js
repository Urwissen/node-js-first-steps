import fetch from 'node-fetch';
import https from 'https';

function getProfile(username) {
    const url = `https://teamtreehouse.com/${username}.json`
    useFetch(url)
    useHttps(url)
}


/* 1. Using fetch request */
function useFetch(url) {

    fetch(url)
    .then(response => {
        console.log("Fetch Status:", response.status)
        return response
    })
    .then(response => response.json())
    .then(user => printData(user.name, user.badges.length, user.points.total))
}


/* 2. Using HTTPs request */
function useHttps(url) {

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
}


function printData(username, badges, points) {
    console.log(`${username} has ${badges} badges with ${points} points!`)
}

const users = ["chalkers", "alenaholligan", "larsgessner"]
users.forEach(getProfile)

