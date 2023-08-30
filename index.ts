const express = require('express');
const mysql = require('mysql');
const cors = require("cors")
const bcrypt = require('bcrypt');

const saltRound = 10;

const app = express();
const port = 3001;
app.use(express.json())

var corsOptions: { origin: String } = {
    origin: 'http://localhost:4000',
}

app.use(cors(corsOptions))
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // password: '',
    database: 'registration-form',
    // Requirements: 'require',++
});

db.connect((err: any) => {
    if (err) {
        console.error('เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล:', err);
    } else {
        console.log('เชื่อมต่อฐานข้อมูลสำเร็จ');
    }
});

app.use(express.json());

app.post('/api/register', (req: any, res: any) => {
    const { firstName, lastName, email, password, Requirements } = req.body;
    //console.log("data", firstName, lastName, email, password, Requirements)

    bcrypt.hash(password, saltRound, (error: any, hash: string) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการเข้ารหัสรหัสผ่าน:', error);
            res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเข้ารหัสรหัสผ่าน' });
            return;
        }

        const query = 'INSERT INTO registration (firstName, lastName, email, password, Requirements) VALUES (?, ?, ?, ?,?)';

        db.query(query, [firstName, lastName, email, hash, Requirements], (err: any, _result: any) => {
            if (err) {
                console.error('เกิดข้อผิดพลาดในการเพิ่มข้อมูล:', err);
                res.status(400).json({ error: 'ไม่สามารถลงทะเบียนผู้ใช้ได้' });
            } else {
                console.log('เพิ่มข้อมูลสำเร็จ');
                res.status(200).json({ message: 'ลงทะเบียนผู้ใช้เรียบร้อยแล้ว' });
            }
        });
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
