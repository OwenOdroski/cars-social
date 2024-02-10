let userStorageId = 'usid'

window.onload = function() {
    // Check if user is signed in
    if(storage.getItem(userStorageId) == null) {
        // Not Signed in
        document.getElementById('signin-popup').style.display = 'block'
    } else {
        // Signed in
        document.getElementById('signin-popup').style.display = 'none'

        //Get Following, tags, and cars
        postData({key: storage.getItem(userStorageId)}, '/get-account-info', function(data) {
            loadProfile(data)
        })
    }
}
function submit() {
    let username = document.getElementById('new-username')
    let password = document.getElementById('new-password')

    postData({username: username.value, password: password.value}, '/create-sign-in', function(data) {
        console.log(data)
        if(!data.text) {
            storage.setItem(userStorageId, data.key)
            location.reload()
        } else {
            console.log(data.text)
        }
    })
}

async function postData(data, url, callback) {
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    let res = response.json()

    res.then((data) => {
        callback(data)
    })
}

function addCar() {

}

function loadProfile(res) {
    document.getElementById('accountName').innerHTML = res.username.toUpperCase()
    let carEle = document.getElementById('cars')

    for(let i in res.cars) {
        carEle.innerHTML += ''
    }
}