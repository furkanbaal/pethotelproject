document.getElementById('reservationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const petName = document.getElementById('petName').value;
    const ownerName = document.getElementById('ownerName').value;
    const checkinDate = document.getElementById('checkinDate').value;
    const checkoutDate = document.getElementById('checkoutDate').value;

    try {
        const response = await fetch('http://localhost:3000/reserve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ petName, ownerName, checkinDate, checkoutDate }),
        });

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
});
