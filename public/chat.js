const socket = io();


socket.on('message', (message) => {
    console.log(message);
});


document.getElementById('messageForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const message = event.target.elements.message.value;
    socket.emit('sendMessage', message);
});


document.getElementById('sendLocation').addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('you cant send geolocation , cause it is not supported');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit('sendLocation', {lat: latitude, long: longitude});
    });
});
