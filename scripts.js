const mdroll = document.getElementById('mdroll');
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
let roll = 0;
let rickPoint = 0;
if (sessionStorage.getItem("roll")) {
    roll = sessionStorage.getItem("roll");
    rickPoint = sessionStorage.getItem("rickPoint");
}

function whenLoad() {
    RickToast();
    progress();
}
function RickToast() {
    let x = Math.random() * 100;
    x = x.toFixed(0);
    console.log(x);
    if (x <= 3) {
        $('.theroll').css('display', 'block');
        $('.toastRoll').get(0).play();
        roll++;
    }
    setTimeout(() => {
        if (roll == 0) {
            RickToast();
        }
    }, 1000)
}
function progress() {
    setTimeout(() => {
        if (roll > 0) {
            rickPoint += ((100 / 18650) * roll);
        }
        if (rickPoint >= 100) {
            window.close();
        }
        $('.progress-bar').css('width', rickPoint + '%');
        $('.progress-bar').attr('aria-valuenow', rickPoint);
        $('.progress-bar').text(rickPoint.toFixed(0) + '%');
        if (rickPoint.toFixed(0) == 70) {
            $('.progress-bar').attr('class', 'progress-bar progress-bar-striped progress-bar-animated bg-warning');
        }
        if (rickPoint.toFixed(0) == 85) {
            $('.progress-bar').attr('class', 'progress-bar progress-bar-striped progress-bar-animated bg-danger');
        }
        if (rickPoint.toFixed(0) >= 10 || roll > 0) {
            $('.alert').css('display', 'block');
        }
        if (rickPoint.toFixed(0) == 50 || roll > 0) {
            $('.alert').css('color', '#fe1616');
        }
        if (roll == 0 && rickPoint.toFixed(0) <= 50) {
            $('.alert').css('display', 'none');
        }
        if (roll == 1 && rickPoint >= 50) {
            let y = Math.random() * 10000;
            y = y.toFixed(0);
            if (y < 6) {
                $('#mdroll').modal('show');
                $('.modalroll').get(0).play();
                roll++;
            }
        }
        sessionStorage.setItem("roll", roll);
        sessionStorage.setItem("rickPoint", rickPoint);
        console.log('go');
        progress();
    }, 10)
}


function StopToast() {
    $('.theroll').css('display', 'none');
    $('.toastRoll').get(0).pause();
    roll--;
    RickToast();
}




function Stopmdroll() {
    roll--;
    $('.modalroll').get(0).pause();
}
mdroll.addEventListener('hidden.bs.modal', event => {
    Stopmdroll();
})