const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const users = [
    { username: 'admin', password: '123', role: 'admin', nama: 'Pak Admin' },
    { username: 'mhs', password: '123', role: 'mahasiswa', nama: 'Budi (Mhs)' },
];

let dataMahasiswa = [
    { id: 1, nama: "Andi Saputra", jurusan: "Teknik Informatika", status: "Aktif" },
    { id: 2, nama: "Siti Aminah", jurusan: "Sistem Informasi", status: "Cuti" }
];

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ 
            success: true, 
            message: "Login Berhasil", 
            data: { username: user.username, role: user.role, nama: user.nama } 
        });
    } else {
        res.status(401).json({ success: false, message: "Username atau Password salah!" });
    }
});

app.get('/api/mahasiswa', (req, res) => {
    res.json(dataMahasiswa);
});

app.post('/api/mahasiswa', (req, res) => {
    const role = req.headers['user-role']; 
    if (role !== 'admin') return res.status(403).json({ message: "Akses Ditolak Anda Bukan Admin" });

    const newData = { 
        id: Date.now(), 
        nama: req.body.nama, 
        jurusan: req.body.jurusan,
        status: req.body.status 
    };
    dataMahasiswa.push(newData);
    res.json(newData);
});

app.put('/api/mahasiswa/:id', (req, res) => {
    const role = req.headers['user-role'];
    if (role !== 'admin') return res.status(403).json({ message: "Akses Ditolak" });

    const id = parseInt(req.params.id);
    const index = dataMahasiswa.findIndex(m => m.id === id);
    if (index !== -1) {
        dataMahasiswa[index].nama = req.body.nama;
        dataMahasiswa[index].jurusan = req.body.jurusan;
        dataMahasiswa[index].status = req.body.status;
        res.json(dataMahasiswa[index]);
    } else {
        res.status(404).json({ message: "Not found" });
    }
});

app.delete('/api/mahasiswa/:id', (req, res) => {
    const role = req.headers['user-role'];
    if (role !== 'admin') return res.status(403).json({ message: "Akses Ditolak" });

    const id = parseInt(req.params.id);
    dataMahasiswa = dataMahasiswa.filter(m => m.id !== id);
    res.json({ message: "Deleted" });
});

app.listen(PORT, () => console.log(`Server UP DI: http://localhost:${PORT}`));