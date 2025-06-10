const book = $('#book');
const flipSound = document.getElementById('flipSound');
const dopamineSong = document.getElementById('dopamineSong');
const flag = false

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

    if (currentPage == 1 || currentPage == 2) {
        if (dopamineSong.paused) {
            dopamineSong.currentTime = 0;
            dopamineSong.volume = 0.1; // تنظیم حجم صدا
            dopamineSong.play().catch(err => {
                console.warn('صدا پخش نشد:', err);
            });
        }
    } else {
        console.log(`صفحه فعلی: ${currentPage}`);
    }
}
