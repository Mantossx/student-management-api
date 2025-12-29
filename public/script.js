const API_URL = 'http://localhost:3000/api';
let modalInstance;
let currentUser = null; 

document.addEventListener('DOMContentLoaded', () => {
    modalInstance = new bootstrap.Modal(document.getElementById('formModal'));
    checkSession(); 
});

function checkSession() {
    const session = localStorage.getItem('userSession');
    if (session) {
        currentUser = JSON.parse(session);
        showDashboard();
    } else {
        showLogin();
    }
}

async function handleLogin() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: u, password: p })
        });
        const result = await res.json();

        if (result.success) {
            localStorage.setItem('userSession', JSON.stringify(result.data));
            currentUser = result.data;
            
            Swal.fire({
                icon: 'success',
                title: `Selamat Datang, ${currentUser.role}!`,
                timer: 1500,
                showConfirmButton: false
            });
            showDashboard();
        } else {
            Swal.fire('Gagal', result.message, 'error');
        }
    } catch (err) {
        console.error(err);
    }
}

function handleLogout() {
    localStorage.removeItem('userSession');
    currentUser = null;
    showLogin();
}

function showLogin() {
    document.getElementById('login-section').classList.remove('d-none');
    document.getElementById('dashboard-section').classList.add('d-none');
}

function showDashboard() {
    document.getElementById('login-section').classList.add('d-none');
    document.getElementById('dashboard-section').classList.remove('d-none');
    document.getElementById('user-display').innerText = `Halo, ${currentUser.nama} (${currentUser.role})`;

    const adminElements = document.querySelectorAll('.admin-only');
    adminElements.forEach(el => {
        if (currentUser.role === 'admin') {
            el.style.display = ''; 
        } else {
            el.style.display = 'none'; 
        }
    });

    loadData();
}

async function loadData() {
    const res = await fetch(`${API_URL}/mahasiswa`);
    const data = await res.json();
    const tbody = document.getElementById('tabel-body');
    tbody.innerHTML = '';

    data.forEach((m, i) => {
        let badgeClass = m.status === 'Aktif' ? 'bg-success' : (m.status === 'Cuti' ? 'bg-warning' : 'bg-primary');
        
        let actionButtons = '';
        if (currentUser.role === 'admin') {
            actionButtons = `
                <td class="text-end pe-4">
                    <button class="btn btn-sm btn-light text-warning shadow-sm rounded-circle me-1 btn-action" onclick="editData(${m.id}, '${m.nama}', '${m.jurusan}', '${m.status}')"><i class="fas fa-pen"></i></button>
                    <button class="btn btn-sm btn-light text-danger shadow-sm rounded-circle btn-action" onclick="hapusData(${m.id})"><i class="fas fa-trash"></i></button>
                </td>
            `;
        }

        tbody.innerHTML += `
            <tr class="row-animate" style="animation-delay: ${i * 0.1}s">
                <td class="ps-4 fw-bold text-dark">${m.nama}</td>
                <td>${m.jurusan}</td>
                <td><span class="badge ${badgeClass}">${m.status}</span></td>
                ${actionButtons}
            </tr>
        `;
    });
}
async function simpanData() {
    const id = document.getElementById('id-mhs').value;
    const payload = {
        nama: document.getElementById('nama').value,
        jurusan: document.getElementById('jurusan').value,
        status: document.getElementById('status').value
    };

    const url = id ? `${API_URL}/mahasiswa/${id}` : `${API_URL}/mahasiswa`;
    const method = id ? 'PUT' : 'POST';

    const res = await fetch(url, {
        method: method,
        headers: { 
            'Content-Type': 'application/json',
            'user-role': currentUser.role 
        },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        modalInstance.hide();
        Swal.fire('Sukses', 'Data berhasil disimpan', 'success');
        loadData();
    } else {
        Swal.fire('Gagal', 'Anda tidak memiliki akses!', 'error');
    }
}

async function hapusData(id) {
    const result = await Swal.fire({ title: 'Hapus?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33' });
    if (result.isConfirmed) {
        await fetch(`${API_URL}/mahasiswa/${id}`, { 
            method: 'DELETE',
            headers: { 'user-role': currentUser.role } 
        });
        loadData();
    }
}

function openModal() {
    document.getElementById('id-mhs').value = '';
    document.getElementById('nama').value = '';
    modalInstance.show();
}

function editData(id, n, j, s) {
    document.getElementById('id-mhs').value = id;
    document.getElementById('nama').value = n;
    document.getElementById('jurusan').value = j;
    document.getElementById('status').value = s;
    modalInstance.show();
}