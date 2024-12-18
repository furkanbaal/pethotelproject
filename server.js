const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MSSQL bağlantı ayarları
const dbConfig = {
    user: 'Furkanenver',
    password: '123456',
    server: 'DESKTOP-MPC3LKA\SQLEXPRESS',
    database: 'HayvanOtel',
    options: {
        encrypt: true, // Azure için true olmalı
        trustServerCertificate: true, // Yerel test için
    },
};

// Rezervasyon verilerini kaydetmek için API
app.post('/reserve', async (req, res) => {
    const { petName, ownerName, checkinDate, checkoutDate } = req.body;

    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('PetName', sql.NVarChar, petName)
            .input('OwnerName', sql.NVarChar, ownerName)
            .input('CheckinDate', sql.Date, checkinDate)
            .input('CheckoutDate', sql.Date, checkoutDate)
            .query(`
                INSERT INTO Bookings (PetName, OwnerName, CheckinDate, CheckoutDate)
                VALUES (@PetName, @OwnerName, @CheckinDate, @CheckoutDate)
            `);

        res.status(201).send({ message: 'Rezervasyon başarıyla kaydedildi!', result });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Rezervasyon kaydedilirken bir hata oluştu.' });
    }
});

// Sunucu başlat
app.listen(3000, () => {
    console.log('Sunucu 3000 portunda çalışıyor.');
});
