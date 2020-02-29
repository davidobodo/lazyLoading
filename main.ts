//-----------------------------------------------------------------------------------
//Method 1 (Vanilla JS)
//-----------------------------------------------------------------------------------

// document.addEventListener('DOMContentLoaded', handleLazyLoad);

// function handleLazyLoad() {
//     let lazyImages: any = document.querySelectorAll("img"); // ran from typescript
//     let active = false;

//     const lazyLoad = () => {
//         if (active === false) {
//             active = true;

//             setTimeout(() => {
//                 lazyImages.forEach(lazyImage => {
//                     if (lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) {

//                         lazyImage.parentElement.classList.remove("loading");
//                         lazyImage.src = lazyImage.dataset.src;

//                         //remove the img already displaying from initial NodeList
//                         lazyImages = [...lazyImages].filter(image => {
//                             return image !== lazyImage;
//                         });

//                         console.log(lazyImages.length)

//                         if (lazyImages.length === 0) {
//                             document.removeEventListener("scroll", lazyLoad);
//                             window.removeEventListener("resize", lazyLoad);
//                             window.removeEventListener("orientationchange", lazyLoad);
//                         }
//                     }
//                 })
//                 active = false;
//             }, 200);
//         }
//     };

//     document.addEventListener("scroll", lazyLoad);
//     window.addEventListener("resize", lazyLoad);
//     window.addEventListener("orientationchange", lazyLoad);
// }

//-----------------------------------------------------------------------------------
//Method 2 (Intersection Observer)
//-----------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', handleLazyLoad);

function handleLazyLoad() {
    let lazyImages: any = document.querySelectorAll("img");

    const options: any = {
        rootOptions: '0px 0px 10px 0px'
    }

    let lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let lazyImage: any = entry.target;
                lazyImage.parentElement.classList.remove("loading");
                lazyImage.src = lazyImage.dataset.src;
                observer.unobserve(lazyImage);
            }
        });
    }, options);

    lazyImages.forEach(image => {
        lazyImageObserver.observe(image)
    })
}