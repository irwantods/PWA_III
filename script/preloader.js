    // ini adalah code untuk preloader yang ditampilkan
    function showPreloader() {
        document.querySelector('.preloader-background').innerHTML =
            `
        <div class="preloader-wrapper big active">
            <div class="spinner-layer">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div>
                <div class="gap-patch">
                    <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
    `
    }