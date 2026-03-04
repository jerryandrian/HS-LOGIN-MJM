function updateDateTime() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    // Greeting
    let greeting;
    if ((hour > 4 && hour < 12) || (hour === 4 && minute >= 0) || (hour === 12 && minute === 0)) {
        greeting = "Good Morning";
    } else if ((hour > 12 && hour < 21) || (hour === 12 && minute > 0) || (hour === 21 && minute === 0)) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Night";
    }

    const greetingElement = document.getElementById("greeting");
    if (greetingElement) greetingElement.textContent = greeting;

    // Tanggal otomatis
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const dayName = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    const dateElement = document.getElementById("date-location");
    if (dateElement) {
        dateElement.textContent = `Bali, Indonesia · ${dayName}, ${date} ${month} ${year}`;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    updateDateTime();
    setInterval(updateDateTime, 1000);
}); 