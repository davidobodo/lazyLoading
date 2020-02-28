//-----------------------------------------------------------------------------------
//Method 1 (Vanilla JS)
//-----------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', handleLazyLoad);
// document.addEventListener('click', handleLazyLoad);

function handleLazyLoad() {
    let lazyImages: any = document.querySelectorAll("img"); // ran from typescript
    let active = false;

    const lazyLoad = () => {
        if (active === false) {
            active = true;

            setTimeout(() => {
                lazyImages.forEach(lazyImage => {
                    if (lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) {
                        lazyImage.parentElement.classList.remove("loading");
                        lazyImage.src = lazyImage.dataset.src;

                        lazyImages = [...lazyImages].filter(function (image) {
                            return image !== lazyImage;
                        });

                        if (lazyImages.length === 0) {
                            document.removeEventListener("scroll", lazyLoad);
                            window.removeEventListener("resize", lazyLoad);
                            window.removeEventListener("orientationchange", lazyLoad);
                        }
                    }
                })
                active = false;
            }, 200);
        }
    };

    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
}