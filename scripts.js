const hospitalData = {
    nemom: [
        { name: "Nemom General Hospital", tokensAvailable: 10, currentToken: 5 },
        { name: "Nemom Multi-Specialty Clinic", tokensAvailable: 8, currentToken: 3 },
        { name: "Nemom Health Center", tokensAvailable: 15, currentToken: 9 }
    ],
    "tvm-south": [
        { name: "TVM South Hospital", tokensAvailable: 20, currentToken: 12 },
        { name: "Southside Clinic", tokensAvailable: 25, currentToken: 15 }
    ],
    "tvm-north": [
        { name: "TVM North Health Center", tokensAvailable: 30, currentToken: 18 },
        { name: "North Multi-Specialty Clinic", tokensAvailable: 12, currentToken: 6 }
    ],
    "parasala": [
        { name: "Parasala Health Center", tokensAvailable: 30, currentToken: 18 },
        { name: "parasala General Clinic", tokensAvailable: 12, currentToken: 6 }
    ]
};


function showHospitals() {
    const location = document.getElementById('locationDropdown').value;
    const hospitalListContainer = document.getElementById('hospitalList');
    const hospitalList = document.getElementById('hospitals');

    if (!location) {
        alert("Please select a location"); 
        return;
    }

    if (hospitalData[location]) {
        hospitalList.innerHTML = '';
        hospitalData[location].forEach((hospital, index) => {
            const hospitalDiv = document.createElement('div');
            hospitalDiv.className = 'hospital';
            hospitalDiv.innerHTML = `
                <div>
                    <h3>${hospital.name}</h3>
                    <p>Available Tokens: ${hospital.tokensAvailable}</p>
                    <p>Current Token: ${hospital.currentToken}</p>
                </div>
                <button class="btn" onclick="showBookingForm(${index}, '${location}')">Book Token</button>
            `;
            hospitalList.appendChild(hospitalDiv);
        });

        hospitalListContainer.style.display = 'block'; 
    } else {
        hospitalListContainer.style.display = 'none';
    }
}


function showBookingForm(index, location) {
    document.getElementById('bookingForm').style.display = 'block';
    document.getElementById('bookingForm').setAttribute('data-location', location);
    document.getElementById('bookingForm').setAttribute('data-hospital-index', index);
}


function bookToken() {
    const name = document.getElementById('userName').value;
    const phone = document.getElementById('userPhone').value;

    if (name && phone) {
        const location = document.getElementById('bookingForm').getAttribute('data-location');
        const hospitalIndex = document.getElementById('bookingForm').getAttribute('data-hospital-index');
        const selectedHospital = hospitalData[location][hospitalIndex];
        const currentToken = selectedHospital.currentToken + 1;

        userToken = { name, phone, token: currentToken, location, hospital: selectedHospital.name };
        selectedHospital.currentToken = currentToken; 

        document.getElementById('bookingForm').style.display = 'none';
        showTokenStatus();
    } else {
        alert('Please fill out all fields.');
    }
}


function showTokenStatus() {
    document.getElementById('tokenStatusPage').style.display = 'block';
    document.getElementById('currentToken').innerText = userToken.token;

    let estimatedTime = 30 * (userToken.token - 1); 
    const estimatedTimeElem = document.getElementById('estimatedTime');
    const waitingTimeElem = document.getElementById('waitingTime');

    function updateEstimatedTime() {
        estimatedTime--;
        waitingTimeElem.innerText = estimatedTime;

        if (estimatedTime <= 0) {
            clearInterval(timeInterval);
            waitingTimeElem.innerText = 'Your turn is now!';
        }
    }

    const timeInterval = setInterval(updateEstimatedTime, 1000);
    updateEstimatedTime();
}
