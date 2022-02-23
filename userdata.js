import fetch from 'node-fetch';
import https from 'https';

function getProfile(username) {
    const url = `https://teamtreehouse.com/${username}.json`
    useFetch(url)
    useHttps(url)
}

// Error Printer
function printError(nameOfFunction, error) {
    console.error(`Inside -> ${nameOfFunction.toString().split("{")[0]}<- ${error.message}`)
}


/* 1. Using fetch request */
function useFetch(url) {
    try {
        fetch(url)
    .then(response => {
        console.log("Fetch Status:", response.status)
        return response
    })
    .then(response => response.json())
    .then(user => printData(user.name, user.badges.length, user.points.total))
    .catch(e => printError(fetch, e))
    } catch (error) {
        printError(useFetch, error)
    }
    
}


/* 2. Using HTTPs request */
function useHttps(url) {
    try {
        const request = https.get(url, (response) => {
            console.log("HTTPs Status:", response.statusCode)
            let body = ""
            response.on("data", data => {
                body += data.toString();
            })
            
            response.on("end", () => {
                try {
                    const user = JSON.parse(body)
                    printData(user.name, user.badges.length, user.points.total)
                } catch(error) {
                    printError(useHttps, error)
                }
            });
            
            
        })
        
        request.on("error", e => {
            printError(request, e)
        });
    } catch (error){
       printError(useHttps, error)
    }
    
    
}


function printData(username, badges, points) {
    console.log(`${username} has ${badges} badges with ${points} points!`)
}

const users = process.argv.slice(2) //["chalkers", "alenaholligan", "larsgessner"]
users.forEach(getProfile)


