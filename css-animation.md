.slide {
    background: url("https://happysmileclinics.com/wp-content/uploads/2024/05/dentalimplants-car.jpg") repeat-y;
    -webkit-animation: bgScroll 1500s linear infinite;
    animation: bgScroll 1500s linear infinite reverse;
    height: 100%;
    background-size: cover;
    position: relative;
}

@keyframes bgScroll{  
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 0 10000%;
    }
}