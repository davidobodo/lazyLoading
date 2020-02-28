//-----------------------------------------------------------------------------------
//Method 1 (Vanilla JS)
//-----------------------------------------------------------------------------------
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
document.addEventListener('DOMContentLoaded', handleLazyLoad);
// document.addEventListener('click', handleLazyLoad);
function handleLazyLoad() {
    var lazyImages = document.querySelectorAll("img"); // ran from typescript
    var active = false;
    var lazyLoad = function () {
        if (active === false) {
            active = true;
            setTimeout(function () {
                lazyImages.forEach(function (lazyImage) {
                    if (lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) {
                        lazyImage.parentElement.classList.remove("loading");
                        lazyImage.src = lazyImage.dataset.src;
                        //remove the img already displaying from initial NodeList
                        lazyImages = __spreadArrays(lazyImages).filter(function (image) {
                            return image !== lazyImage;
                        });
                        console.log(lazyImages.length);
                        if (lazyImages.length === 0) {
                            document.removeEventListener("scroll", lazyLoad);
                            window.removeEventListener("resize", lazyLoad);
                            window.removeEventListener("orientationchange", lazyLoad);
                        }
                    }
                });
                active = false;
            }, 200);
        }
    };
    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
}
