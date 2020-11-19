document.addEventListener("DOMContentLoaded", () => {
    var urlParams = new URLSearchParams(window.location.search);
    var isFromSaved = urlParams.get("saved");
    // ngambil tombol element id yang ada di page detail-team.html lalu dibuatkan variable
    var btnSave = document.getElementById("save");
    var btnDelete = document.getElementById("remove");

    if (isFromSaved) {
        // menampilkan button delete menyembunyikan tombol save 
        btnSave.style.display = 'none';
        btnDelete.style.display = 'block';
        // ambil artikel lalu tampilkan
        getSavedTeamById();
    } else {
        // menampilkan button save menyembunyikan tombol delete
        btnSave.style.display = 'block';
        btnDelete.style.display = 'none';
    }
    var item = getTeamById();
    save.onclick = () => {
        console.log("Tombol FAB di klik.");
        item.then((team) => {
                saveForLater(team);
            })
            // kalo tombol save di klik tombol save akan disable maka tombol tong sampah akan muncul ke permukaan
        btnSave.style.display = 'none';
        btnDelete.style.display = 'block';
    };
    var idTeam = urlParams.get("id");
    remove.onclick = () => {
        console.log("Tombol hapus di klik");
        item.then((idTeam) => {
                deleteTeam(idTeam);
            })
            // begitupun sebaliknya kalo tombol tong sampah di klik maka tombol save akan muncul ke permukaan dan tombol delete akan disable
        btnSave.style.display = 'block';
        btnDelete.style.display = 'none';
    };
});