let limitRes = 5
let dataCount = 0
let arr = []
let carSubmission

async function get() {
    let res = await fetch('https://vehicle-specs.glitch.me/allSearch')
    let json = await res.json()
    load(json)
  }
  get()

  function load(data) {
    let text = document.getElementById('search')
    let res = document.getElementById('res')
    let count = 0

    for (let curr of data) {
        let text = curr.year + ' ' +
            curr.brand + ' ' +
            curr.model + ' ' +
            curr.series;
        let element = document.createElement('p');
        element.innerHTML = `<a class="search-result" onclick="addVehicle(${count})" style="display: block">${text} <hr><br></a>`;
        res.appendChild(element);
        count += 1
    }
    arr = data

    text.onkeyup = function () {
        var MAX_RESULTS = 5; // Maximum number of search results
        if (text.value == '') {
            res.style.display = 'none';
        } else {
            res.style.display = 'block';
            var filter, a, i, txtValue, resultCount;
            filter = text.value.toUpperCase();
            words = res.getElementsByTagName('p');
            resultCount = 0; // Counter for the number of displayed search results

            for (i = 0; i < words.length; i++) {
                a = words[i].getElementsByTagName("a")[0];
                txtValue = a.textContent || a.innerText;
                
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    words[i].style.display = "";
                    resultCount++; // Increment the result count for each displayed result
                    if (resultCount >= MAX_RESULTS) {
                    break; // Break the loop if the maximum number of results is reached
                    }
                } else {
                    words[i].style.display = "none";
                }
            }

            // Hide remaining results if they exceed MAX_RESULTS
            for (; i < words.length; i++) {
            words[i].style.display = "none";
            }
        }
    }
  }

  function addVehicle(id) {
    let data = arr[id]
    
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

async function doFetch(vin, year, callback) {
    let res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinExtended/${vin}?format=json&modelyear=${year}`)
    let json = await res.json()
    callback(json)
}

function submitVin() {
    let vin = document.getElementById('vin')
    let year = document.getElementById('year')
    dataCount = 0

    doFetch(vin.value, year.value, function(data) {
        console.log(data)
        let obj = formatVin(data.Results)
        document.getElementById('vin-step2').style.display = 'block'
        document.getElementById('vin-popup').style.display = 'none'

        if(check(obj.details.year)) {
            displayError('Error getting VIN Number')
        } else if(check(obj.details.brand)) {
            displayError('Error getting VIN Number')
        } else if(check(obj.details.model)) {
            displayError('Error getting VIN Number')
        }

        document.getElementById('vehicleName').innerHTML = obj.details.year + ' ' + 
        obj.details.brand + ' ' + 
        obj.details.model + ' ' + 
        obj.details.series + ' ' + 
        obj.details.trim + ' '

        document.getElementById('top-speed').value = obj.speed.topSpeed

        carSubmission = obj
    })
}

function submitVehicle() {
    carSubmission.speed.topSpeed = document.getElementById('top-speed').value
    carSubmission.speed.zeroTo60 = document.getElementById('0-60m').value
    carSubmission.speed.zeroTo80kph = document.getElementById('0-80k').value
    carSubmission.speed.zeroTo100 = document.getElementById('0-100m').value
    carSubmission.speed.zeroTo100kph = document.getElementById('0-100k').value
    carSubmission.speed.zeroTo160kph = document.getElementById('0-160k').value
    carSubmission.speed.nurburgringLapTime = document.getElementById('nurb').value
    carSubmission.engine.torque = document.getElementById('torque').value
    carSubmission.engine.torqueRPM = document.getElementById('torqueRPM').value
    carSubmission.general.clearence = document.getElementById('clear').value

    console.log(carSubmission)
    postData({data: carSubmission}, '/vinRequest', function(data) {
        if(data.status) {
            alert(data.text)
        } else {
            window.location.href = '/account'
        }
    })
}
//1HGCP2F3OCAO75867
function formatVin(data) {
    let obj = {
        id: '0',
        details: {
            brand: searchNumber(data, 26),
            model: searchNumber(data, 28),
            series: searchNumber(data, 34),
            trim: searchNumber(data, 38),
            year: searchNumber(data, 29),
            trim2: searchNumber(data, 109),
            series2: searchNumber(data, 110),
            roadLegal: '',
            catagory: searchNumber(data, 5),
            nonLandUse: searchNumber(data, 195)
        }, 
        speed: {
            zeroTo60: '',
            zeroTo100: '',
            zeroTo80kph: '',
            zeroTo100kph: '',
            zeroTo160kph: '',
            topSpeed: searchNumber(data, 139),
            nurburgringLapTime: '',
        },
        engine: {
            type: '',
            model: searchNumber(data, 18),
            cylinders: searchNumber(data, 9),
            cylinderAngle: '',
            engineType: searchNumber(data, 64),
            location: '',
            turboChargers: searchNumber(data, 135),
            superChargers: '',
            displacement: {
                CC: searchNumber(data, 11),
                CI: searchNumber(data, 12),
                L: searchNumber(data, 13),
            },
            compressionRatio: '',
            powerToWeightRatio: '',
            horsepower: searchNumber(data, 71),
            bhp: searchNumber(data, 125),
            torque: '',
            torqueRPM: '',
            redline: '',
            valves: '',
            battery: {
                type: searchNumber(data, 2),
                cellsPerModule: searchNumber(data, 48),
                currentFrom: searchNumber(data, 57),
                currentTo: searchNumber(data, 132),
                voltage: searchNumber(data, 58),
                energyFrom: searchNumber(data, 59),
                energyTo: searchNumber(data, 134),
                number: searchNumber(data, 138)
            }
        },
        fuel: {
            mpg: {
                city: '',
                highway: '',
            },
            range: '',
            injectionType: searchNumber(data, 67),
            type: '',
            tankSize: ''
        },
        aerodynamics: {
            dragCoefficient: ''
        },
        manufacturing: {
            name: searchNumber(data, 27),
            engine: searchNumber(data, 146)
        },
        transmission: {
            gears: searchNumber(data, 63),
            transmissionControl: searchNumber(data, 37),
            launchControl: ''
        },
        safety: {
            ABS: searchNumber(data, 86),
            EDR: searchNumber(data, 175),
            ESC: searchNumber(data, 99),
            tractionControl: searchNumber(data, 100),
            ACC: searchNumber(data, 81),
        },
        body: {
            wheelBaseType: searchNumber(data, 60),
            trackWidth: searchNumber(data, 159),
            seats: searchNumber(data, 33),
            seatRows: searchNumber(data, 61),
            doors: searchNumber(data, 14),
            windows: searchNumber(data, 40),
            axles: searchNumber(data, 41),
            wheels: {
                number: searchNumber(data, 115),
                frontSize: searchNumber(data, 119),
                backSize: searchNumber(data, 120)
            },
            weight: {
                grossVehicleWeightRating: searchNumber(data, 25),
                curb: searchNumber(data, 54),
                grossCombWeightFrom: searchNumber(data, 184),
                grossCombWeightTo: searchNumber(data, 185)
            },
            wheelBase: {
                from: searchNumber(data, 111),
                to: searchNumber(data, 112)
            },
            bed: {
                length: searchNumber(data, 49),
                lengthFeet: searchNumber(data, 118),
                type: searchNumber(data, 3),
            },
            cabType: searchNumber(data, 4),
            trailer: {
                connectionType: searchNumber(data, 116),
                bodyType: searchNumber(data, 117),
                otherTrailerInfo: searchNumber(data, 155)
            }
        },
        general: {
            cost: searchNumber(data, 136),
            type: searchNumber(data, 39),
            steeringLocation: searchNumber(data, 36),
            wheelsDriven: searchNumber(data, 15),
            vehicleType: '',
            clearence: '',
            corneringGforce: '',
            dimensions: {
                width: '',
                height: '',
                length: '',
            }
        }
    };
    return obj
}
function searchNumber(data, number) {
    return format(data.filter(obj => obj.VariableId === number)[0].Value)
}
function format(str) {
    if(str == 'Not Applicable') {
        return ''
    } else if(str == null) {
        return ''
    }
    dataCount += 1
    return str
}

function check(val) {
    console.log(val)
    if(val != '' && val != null && val != undefined) {
        return false
    } else {
        return true
    }
}

function displayError(err) {
    document.getElementById('display-error').style.display = 'block'
    document.getElementById('vin-step2').style.display = 'none'

    document.getElementById('error-text').innerHTML = err

    document.getElementById('error-return').onclick = function() {
        location.reload()
    }
}