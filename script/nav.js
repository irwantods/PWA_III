document.addEventListener('DOMContentLoaded', function() {
    loadNav();

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status != 200) return;
                // Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach((elm) => {
                    elm.innerHTML = xhttp.responseText;
                });
                var elems = document.querySelectorAll(".sidenav");
                M.Sidenav.init(elems);

                // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".sidenav a, .topnav a").forEach((elm) => {
                    elm.addEventListener("click", (event) => {
                        // Tutup sidenav
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        // Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });

            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }
});

// Mengambil halaman konten
var page = window.location.hash.substr(1);
if (page == "") page = "home";
loadPage(page);

function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            var content = document.querySelector("#body-content");
            if (this.status == 200) {
                content.innerHTML = xhttp.responseText;
                // init parallax
                {
                    var elems = document.querySelectorAll('.parallax');
                    M.Parallax.init(elems);
                }
                // init select
                {
                    var select = document.querySelectorAll('select');
                    M.FormSelect.init(select);
                }
                // menjalankan slider
                {

                    // init slider
                    const slider = document.querySelectorAll('.slider');
                    M.Slider.init(slider, {
                        indicators: false,
                        height: 500,
                        duration: 300,
                        interval: 3000
                    });
                }
                // Slider berakhir
                if (page === 'standing') {
                    getValueStanding();
                } else if (page === 'team') {
                    getSelectedValue()
                } else if (page === "saved") {
                    getSavedTeams();
                }

            } else if (this.status == 404) {
                content.innerHTML = `
                    <div class="col s12 m4">
                        <div class="icon-block">
                            <h2 class="center"><img id="front-page-logo" type="image/png" src="/asset/img/data_null.png"></h2>
                                <p class="center">Hey captain! Looks like you're heading to a wrong planet!.</p>
                        </div>
                    </div>
                    `;
            } else {
                content.innerHTML = `
                <div class="col s12 m4">
                    <div class="icon-block">
                        <h2 class="center"><img id="front-page-logo" type="image/png" src="/asset/img/data_null.png"></h2>
                            <p class="center">There's nothing here.</p>
                    </div>
                </div>
                `;
            }
        }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
}
// ngambil value dari standing
function getSelectedValue() {
    var select = document.querySelector('select#id-competition');
    select.addEventListener('change', (e) => {
        const id = e.target.value
        getAllTeam(id);
    })
}
// ngambil value dari team
function getValueStanding() {
    var select = document.querySelector('select#id-competition');
    select.addEventListener('change', (e) => {
        const id = e.target.value
        getAllStandings(id);
    })
}