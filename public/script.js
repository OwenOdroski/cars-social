let limitRes = 5

async function get() {
    let res = await fetch('https://vehicle-specs.glitch.me/allSearch')
    let json = await res.json()
    load(json)
  }
  get()

  function load(data) {
    console.log(data)

    let text = document.getElementById('search');
    let res = document.getElementById('res');

    for (let curr of data) {
    let text = curr.year + ' ' +
        curr.brand + ' ' +
        curr.model + ' ' +
        curr.series;
    let element = document.createElement('p');
    element.innerHTML = `<a class="search-result" href="/vehicle?uuid=${curr.id}" style="display: block">${text} <hr><br></a>`;
    res.appendChild(element);
    }

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
