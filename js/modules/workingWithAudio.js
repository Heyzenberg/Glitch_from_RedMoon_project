'use strict';

const playLinkSoundFX = (links, audio) => {
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            audio.play();
        })
    })
}

// const musicPlay = (button, music) => {
//     button.onclick = () => {
//         if(music.paused === true){
//             music.play();
//         }else{
//             music.pause();
//         }        
//     }
// }

const musicPlayAndVisual = (buttonPlay, visualItem, music, visualItemAddClass) => {
    let contextAudio;
    let analyserAudio;
    
    buttonPlay.onclick = function(){
        if(!contextAudio){
            preparationAudio();
        }
        if(music.paused){
            music.play();
            visualItemAddClass.classList.add('dance');
            visualization();
        }else{
            visualItemAddClass.classList.remove('dance');
            music.pause();
        }
    }
    
    function preparationAudio(){
        contextAudio = new AudioContext();
        analyserAudio = contextAudio.createAnalyser();
        const srcAudio = contextAudio.createMediaElementSource(music);
        srcAudio.connect(analyserAudio);
        analyserAudio.connect(contextAudio.destination);
        visualization();
    }
    
    function visualization(){
        const arrayAudio = new Uint8Array(analyserAudio.frequencyBinCount);
        
        if(!music.paused){
            window.requestAnimationFrame(visualization);
        }
        analyserAudio.getByteFrequencyData(arrayAudio);
        visualItem.height = ((arrayAudio[40])/8)+"vh";
        visualItem.width =  ((arrayAudio[40])/5)+"vw";
    }
}


export { playLinkSoundFX, musicPlayAndVisual};