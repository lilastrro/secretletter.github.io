const book = $('#book');
const flipSound = document.getElementById('flipSound');
const dopamineSong = document.getElementById('dopamineSong');
const flag = true

if (!flag) {
    document.body.innerHTML = `
        <div style="font-size: 2rem; text-align: center;">
            come back later!
        </div>
    `;
}

book.turn({
    width: 900,
    height: 800,
    autoCenter: true,
    gradients: true,
    acceleration: true,
    when: {
        turning: function () {
            flipSound.currentTime = 0;
            flipSound.play();
            checkThePage()
        }
    }
});


function checkThePage() {
    const currentPage = book.turn('page');

    const dopaminePages = [1, 5];

    if (dopaminePages.includes(currentPage)) {
        if (dopamineSong.paused) {
            dopamineSong.currentTime = 0;
            dopamineSong.play().catch(err => {
                console.warn('صدا پخش نشد:', err);
            });
        }
    } else {
        if (!dopamineSong.paused) {
            dopamineSong.pause();
            dopamineSong.currentTime = 0;
        }
        // console.log(`صفحه فعلی: ${currentPage}`);
    }
}