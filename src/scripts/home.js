// Use intersection observer API, https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

import "./polyfills/intersection-observer";

document.addEventListener("DOMContentLoaded", function () {
    let productTiles = document.querySelectorAll(".tile");
    const observeOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3
    }
    const observer = new IntersectionObserver((elements) => {
        elements.forEach(element => {
            if (element.isIntersecting) {
                element.target.firstElementChild.classList.add("visible");
            }
            else {
                element.target.firstElementChild.classList.remove("visible");
            }
        })
    }, observeOptions);
    productTiles.forEach(tile => {
        observer.observe(tile);
    })
});