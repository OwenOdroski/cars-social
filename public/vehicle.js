window.onload = async function() {
    let params = new URLSearchParams(location.search)
    let res = await fetch('https://vehicle-specs.glitch.me/get?id=' + params.get('uuid'))
    let json = await res.json()
    load(json)
}

function load(data) {
    // Head
    document.getElementById('vehicleName').innerHTML = data.details.year + ' ' + data.details.brand + ' ' + data.details.model + ' ' + data.details.series
    
    // General
    if(check(data.general.cost)) document.getElementById('cost').innerHTML = '<b>Price: </b>$'+ addCommas(data.general.cost)
    if(check(data.general.vehicleType)) document.getElementById('type').innerHTML = `<b>Type: </b>${data.general.vehicleType}`
    if(check(data.details.roadLegal)) document.getElementById('road-legal').innerHTML = '<b>Road Legal: </b>' + swap(data.details.roadLegal)
    if(check(data.general.wheelsDriven)) document.getElementById('wheels').innerHTML = `<b>Wheels Driven</b>: ${data.general.wheelsDriven} drive`
    if(check(data.details.catagory)) document.getElementById('catagory').innerHTML = `<b>Vehicle Catagory</b>: ${data.details.catagory}`
    if(check(data.general.seats)) document.getElementById('seats').innerHTML = `<b>Seats: </b> ${data.general.seats}`
    if(check(data.general.doors)) document.getElementById('doors').innerHTML = `<b>Doors: </b> ${data.general.doors}`
    if(check(data.general.weight)) document.getElementById('weight').innerHTML = `<b>Weight: </b> ${data.general.weight}lbs`
    if(check(data.general.dimensions.width) && check(data.general.dimensions.height) && check(data.general.dimensions.length)) document.getElementById('dimensions').innerHTML = `<b>Dimensions (L x W x H): </b> ${data.general.dimensions.length}in x ${data.general.dimensions.width}in x ${data.general.dimensions.height}in`
    if(check(data.general.clearence)) document.getElementById('ground-clear').innerHTML = `<b>Ground Clearence: </b> ${data.general.clearence}mm`
    console.log(data)

    // performance
    if(check(data.speed.topSpeed)) document.getElementById('top-speed').innerHTML = `<b>Top Speed:</b> ${data.speed.topSpeed}mph`
    if(check(data.speed.zeroTo60)) document.getElementById('zero60').innerHTML = `<b>0-60mph (~97kph)</b>: ${data.speed.zeroTo60} seconds`
    if(check(data.speed.zeroTo100))document.getElementById('zero100').innerHTML = `<b>0-100mph (~161kph)</b>: ${data.speed.zeroTo100} seconds`
    if(check(data.speed.nurburgringLapTime))document.getElementById('nurb').innerHTML = `<b>Nurburgring Nordschleife Lap Time</b>: ${data.speed.nurburgringLapTime}`
    if(check(data.transmission.gears))document.getElementById('gears').innerHTML = `<b>Number of Gears</b>: ${data.transmission.gears}`
    if(check(data.transmission.transmissionControl))document.getElementById('control').innerHTML = `<b>Transmission Control</b>: ${data.transmission.transmissionControl}`
    if(check(data.transmission.launchControl))document.getElementById('launch').innerHTML = `<b>Has Launch Control</b>: ${swap(data.transmission.transmissionControl)}`
    if(check(data.general.corneringGforce)) document.getElementById('cornering-gs').innerHTML = `<b>Cornering Gforce: </b> ${data.general.corneringGforce}g`
    
    // Engine
    if(check(data.engine.engineType)) document.getElementById('engineType').innerHTML = `<b>Engine Type:</b> ${data.engine.engineType}`
    if(check(data.engine.cylinders)) document.getElementById('cylinders').innerHTML = `${data.engine.cylinders}`
    if(check(data.engine.location)) document.getElementById('location').innerHTML = `<b>Location: </b>${data.engine.location}-Engined`
    if(check(data.engine.horsepower)) document.getElementById('horsepower').innerHTML = `<b>Horsepower:</b> ${data.engine.horsepower}hp`
    if(check(data.engine.bhp)) document.getElementById('bhp').innerHTML = `<b>Brake Horsepower:</b> ${data.engine.bhp}bhp`
    if(check(data.engine.turboChargers)) document.getElementById('turbos').innerHTML = `<b>Turbo Chargers:</b> ${data.engine.turboChargers}`
    if(check(data.engine.superChargers)) document.getElementById('supers').innerHTML = `<b>Super Chargers:</b> ${data.engine.superChargers}`
    if(check(data.engine.compressionRatio)) document.getElementById('compression').innerHTML = `<b>Compression Ratio:</b> ${data.engine.compressionRatio}`
    if(check(data.engine.boreStrokeRatio)) document.getElementById('bore-stroke').innerHTML = `<b>Bore/Stroke Ratio:</b> ${data.engine.boreStrokeRatio}`
    if(check(data.engine.displacement)) document.getElementById('displacement').innerHTML = `<b>Displacement:</b> ${data.engine.displacement} Liters`
    if(check(data.engine.powerToWeightRatio)) document.getElementById('power-weight').innerHTML = `<b>Power To Weight Ratio:</b> ${data.engine.powerToWeightRatio}`
    if(check(data.engine.torque)) document.getElementById('torque').innerHTML = `<b>Torque:</b> ${data.engine.torque} lb-ft `
    if(check(data.engine.torqueRPM)) document.getElementById('torqueRPM').innerHTML = `<b>@</b> ${data.engine.torqueRPM}rpm`
    if(check(data.engine.redline)) document.getElementById('redline').innerHTML = `<b>Redline RPM:</b> ${data.engine.redline}rpm`

    //Fuel
    if(check(data.fuel.injectionType)) document.getElementById('injection').innerHTML = `<b>Fuel Injection Method:</b> ${data.fuel.injectionType}`
    if(check(data.fuel.mpg.city)) document.getElementById('city-mpg').innerHTML = `<b>City MPG:</b> ${data.fuel.mpg.city}mpg`
    if(check(data.fuel.mpg.highway)) document.getElementById('high-mpg').innerHTML = `<b>Redline RPM:</b> ${data.fuel.mpg.highway}mpg`
    if(check(data.fuel.range)) document.getElementById('range').innerHTML = `<b>Range:</b> ${data.fuel.range} miles`
    if(check(data.fuel.tankSize)) document.getElementById('tank').innerHTML = `<b>Tank Size:</b> ${data.fuel.tankSize} gallons`
    if(check(data.fuel.type)) document.getElementById('fuel-type').innerHTML = `<b>Fuel Type:</b> ${data.fuel.type}`

    
}
function addCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function swap(boolean) {
    if(boolean) {
        return 'Yes'
    } else {
        return 'No'
    }
}
function check(str) {
    if(str != '' && str != undefined) {
        return true
    } else {
        return false
    }
}
console.log(check(undefined))
