var express = require('express');
var mysql = require('mysql');
var cors = require("cors");
var bcrypt = require('bcrypt');
var saltRound = 10;
var app = express();
var port = 3001;
app.use(express.json());
var corsOptions = {
    origin: 'http://localhost:4000',
};
app.use(cors(corsOptions));
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // password: '',
    database: 'registration-form',
    // Requirements: 'require',
});
db.connect(function (err) {
    if (err) {
        console.error('เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล:', err);
    }
    else {
        console.log('เชื่อมต่อฐานข้อมูลสำเร็จ');
    }
});
app.use(express.json());
app.post('/api/register', function (req, res) {
    var _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password, Requirements = _a.Requirements;
    //console.log("data", firstName, lastName, email, password, Requirements)
    bcrypt.hash(password, saltRound, function (error, hash) {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการเข้ารหัสรหัสผ่าน:', error);
            res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเข้ารหัสรหัสผ่าน' });
            return;
        }
        var query = 'INSERT INTO registration (firstName, lastName, email, password, Requirements) VALUES (?, ?, ?, ?,?)';
        db.query(query, [firstName, lastName, email, hash, Requirements], function (err, _result) {
            if (err) {
                console.error('เกิดข้อผิดพลาดในการเพิ่มข้อมูล:', err);
                res.status(400).json({ error: 'ไม่สามารถลงทะเบียนผู้ใช้ได้' });
            }
            else {
                console.log('เพิ่มข้อมูลสำเร็จ');
                res.status(200).json({ message: 'ลงทะเบียนผู้ใช้เรียบร้อยแล้ว' });
            }
        });
    });
});
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
