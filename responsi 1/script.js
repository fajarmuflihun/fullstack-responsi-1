let data = [];

// Tampilkan data di tabel
function loadTable() {
    let tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    data.forEach((produk, i) => {
        tbody.innerHTML += `
            <tr>
                <td><img src="${produk.gambar || 'https://via.placeholder.com/60x60?text=No+Image'}" alt="Gambar Produk" style="width: 60px; height: 60px; border: 1px solid #ddd; object-fit: cover;" onerror="this.src='https://via.placeholder.com/60x60?text=No+Image'; this.onerror=null;"></td>
                <td>${produk.nama}</td>
                <td>Rp ${produk.harga.toLocaleString()}</td>
                <td>${produk.kategori}</td>
                <td>
                    <button class="btn btn-secondary btn-sm" onclick="showEdit(${i})" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                    <button class="btn btn-dark btn-sm" onclick="deleteProduk(${i})">Hapus</button>
                </td>
            </tr>
        `;
    });
}

// Tambah produk
function addProduk() {
    let nama = document.getElementById("namaProduk").value.trim();
    let harga = parseFloat(document.getElementById("hargaProduk").value);
    let kategori = document.getElementById("kategoriProduk").value.trim();
    let gambar = document.getElementById("gambarProduk").value.trim();

    if (nama === "" || isNaN(harga) || harga <= 0 || kategori === "") {
        alert("Semua field harus diisi dengan benar!");
        return;
    }

    data.push({ nama, harga, kategori, gambar });
    loadTable();

    document.getElementById("namaProduk").value = "";
    document.getElementById("hargaProduk").value = "";
    document.getElementById("kategoriProduk").value = "";
}

// Hapus produk
function deleteProduk(i) {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
        data.splice(i, 1);
        loadTable();
        updateDashboard();
    }
}

// Tampilkan modal edit
function showEdit(i) {
    document.getElementById("editIndex").value = i;
    document.getElementById("editNama").value = data[i].nama;
    document.getElementById("editHarga").value = data[i].harga;
    document.getElementById("editKategori").value = data[i].kategori;
    document.getElementById("editGambar").value = data[i].gambar || "";
}

// Update produk
function updateProduk() {
    let i = document.getElementById("editIndex").value;
    let nama = document.getElementById("editNama").value.trim();
    let harga = parseFloat(document.getElementById("editHarga").value);
    let kategori = document.getElementById("editKategori").value.trim();
    let gambar = document.getElementById("editGambar").value.trim();

    if (nama === "" || isNaN(harga) || harga <= 0 || kategori === "") {
        alert("Semua field harus diisi dengan benar!");
        return;
    }

    data[i].nama = nama;
    data[i].harga = harga;
    data[i].kategori = kategori;
    data[i].gambar = gambar;

    loadTable();
    updateDashboard();
}

// Toggle sidebar pakai jQuery
$("#toggleBtn").click(function () {
    if ($(window).width() <= 768) {
        // Mobile: toggle 'show' class
        $("#sidebar").toggleClass("show");
        $("#content").toggleClass("shifted");

        // Show/hide overlay
        if ($("#sidebar").hasClass("show")) {
            $("#overlay").show();
        } else {
            $("#overlay").hide();
        }
    } else {
        // Desktop: toggle 'hidden' class
        $("#sidebar").toggleClass("hidden");
        $("#content").toggleClass("shifted");
    }
});

// Toggle sidebar for dashboard
$("#toggleBtnDashboard").click(function () {
    if ($(window).width() <= 768) {
        // Mobile: toggle 'show' class
        $("#sidebar").toggleClass("show");
        $("#dashboard").toggleClass("shifted");

        // Show/hide overlay
        if ($("#sidebar").hasClass("show")) {
            $("#overlay").show();
        } else {
            $("#overlay").hide();
        }
    } else {
        // Desktop: toggle 'hidden' class
        $("#sidebar").toggleClass("hidden");
        $("#dashboard").toggleClass("shifted");
    }
});

// Close sidebar when clicking overlay (mobile only)
$("#overlay").click(function () {
    $("#sidebar").removeClass("show");
    $("#content").removeClass("shifted");
    $("#dashboard").removeClass("shifted");
    $("#overlay").hide();
});

// Fungsi untuk menampilkan dashboard
function showDashboard() {
    document.getElementById("content").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("dashboardLink").classList.add("active");
    document.getElementById("produkLink").classList.remove("active");
    updateDashboard();
}

// Fungsi untuk menampilkan produk
function showProducts() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("content").style.display = "block";
    document.getElementById("produkLink").classList.add("active");
    document.getElementById("dashboardLink").classList.remove("active");
}

// Update dashboard
function updateDashboard() {
    // Update Summary
    document.getElementById("totalProduk").innerText = data.length;
    document.getElementById("totalKategori").innerText =
        new Set(data.map(p => p.kategori)).size;

    let totalHarga = data.reduce((sum, p) => sum + Number(p.harga), 0);
    document.getElementById("totalHarga").innerText =
        "Rp " + totalHarga.toLocaleString();

    // Isi tabel produk singkat
    let table = document.getElementById("ringkasTable");
    table.innerHTML = "";
    data.slice(-5).reverse().forEach(p => {
        let row = `<tr>
            <td>${p.nama}</td>
            <td>Rp ${Number(p.harga).toLocaleString()}</td>
            <td>${p.kategori}</td>
        </tr>`;
        table.innerHTML += row;
    });
}

loadTable();
