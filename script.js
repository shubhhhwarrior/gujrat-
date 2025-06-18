// script.js - Handles form submissions for all booking services

// Helper to open WhatsApp with a prefilled message
function openWhatsApp(message) {
    const phone = ''; // Add your business WhatsApp number here if needed (e.g., '919999999999')
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// CAB BOOKING
const cabForm = document.getElementById('cab-booking-form');
cabForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = cabForm.name.value;
    const phone = cabForm.phone.value;
    const pickup = cabForm.pickup.value;
    const drop = cabForm.drop.value;
    const datetime = cabForm.datetime.value;
    const msg = `Cab Booking Request:\nName: ${name}\nPhone: ${phone}\nPickup: ${pickup}\nDrop: ${drop}\nDate & Time: ${datetime}`;
    // Here you could send data to backend (e.g., save to Excel)
    openWhatsApp(msg);
});

// BUS BOOKING
const busForm = document.getElementById('bus-booking-form');
busForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = busForm.name.value;
    const phone = busForm.phone.value;
    const from = busForm.from.value;
    const to = busForm.to.value;
    const date = busForm.date.value;
    const msg = `Bus Ticket Booking Request:\nName: ${name}\nPhone: ${phone}\nFrom: ${from}\nTo: ${to}\nDate: ${date}`;
    // Here you could send data to backend (e.g., save to Excel)
    openWhatsApp(msg);
});

// TRAIN BOOKING
const trainForm = document.getElementById('train-booking-form');
trainForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = trainForm.name.value;
    const phone = trainForm.phone.value;
    const from = trainForm.from.value;
    const to = trainForm.to.value;
    const date = trainForm.date.value;
    const train = trainForm.train.value;
    const msg = `Train Ticket Booking Request:\nName: ${name}\nPhone: ${phone}\nFrom: ${from}\nTo: ${to}\nDate: ${date}\nPreferred Train: ${train}`;
    // Here you could send data to backend (e.g., save to Excel)
    openWhatsApp(msg);
});

// FLIGHT BOOKING
const flightForm = document.getElementById('flight-booking-form');
flightForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = flightForm.name.value;
    const phone = flightForm.phone.value;
    const from = flightForm.from.value;
    const to = flightForm.to.value;
    const date = flightForm.date.value;
    const airline = flightForm.airline.value;
    const msg = `Flight Ticket Booking Request:\nName: ${name}\nPhone: ${phone}\nFrom: ${from}\nTo: ${to}\nDate: ${date}\nPreferred Airline: ${airline}`;
    // Here you could send data to backend (e.g., save to Excel)
    openWhatsApp(msg);
});

// HOLIDAY PACKAGES
const holidayForm = document.getElementById('holiday-packages-form');
holidayForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = holidayForm.name.value;
    const phone = holidayForm.phone.value;
    const destination = holidayForm.destination.value;
    const people = holidayForm.people.value;
    const startDate = holidayForm['start-date'].value;
    const msg = `Holiday Package Enquiry:\nName: ${name}\nPhone: ${phone}\nDestination: ${destination}\nNo. of People: ${people}\nStart Date: ${startDate}`;
    // Here you could send data to backend (e.g., save to Excel)
    openWhatsApp(msg);
}); 