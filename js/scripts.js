/*- mov-slider -*/
var swiper = new Swiper('.mov-slider', {
    spaceBetween: 5,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
});

/*- phone-input -*/
[].forEach.call(document.querySelectorAll('input[type="tel"]'), function (input) {
    let keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+7 (___) ___-__-__",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            newValue = matrix.replace(/[_\d]/g, function (a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
            });
        i = newValue.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            newValue = newValue.slice(0, i);
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function (a) {
                return "\\d{1," + a.length + "}";
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = newValue;
        if (event.type == "blur" && this.value.length < 5) this.value = "";
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
});

/*- modal -*/
const myModal = new HystModal({
    closeOnEsc: true,
    backscroll: true,
    afterClose: function(modal){
        let videoframe = modal.openedWindow.querySelector('iframe');
        if(videoframe){
            videoframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
        }
    },        
});