const preloader = () => {
    
    const clickToStart = document.querySelector('.click-to-start');
    const preloaderBody = document.querySelector('.preloader-body');

    const showClickToStart = () => {
        clickToStart.classList.add('show');
    }

    setTimeout(showClickToStart, 11000);
    
    clickToStart.addEventListener('click', () => {
        preloaderBody.classList.add('hide');
        
        const startSound = new Audio;
        startSound.src = '../sounds/FX/start_Glitch.mp3';    
        startSound.volume = 0.3;
        startSound.play();
    });
};

export { preloader };