'use strict';

import { elementsBG } from './modules/elements-bg.js';
import { addHoverToLinks } from './modules/addHoverToLinks.js'
import { playLinkSoundFX, musicPlayAndVisual } from './modules/workingWithAudio.js';
import { musicPlayer } from './modules/musicPlayer.js';
import { preloader } from './modules/preloader.js';
import { interfaceLogic } from './modules/interfaceLogic.js';


preloader();

elementsBG();


const mainLinks = document.querySelectorAll('#mainLink');
const mainIndicators = document.querySelectorAll('#mainIndicator');
addHoverToLinks(mainLinks, mainIndicators);

/////////////////////////////////////////////////////////////////////////////////////////

const mainLinkFX = new Audio;
mainLinkFX.src = '../sounds/FX/glitch_fx_click.mp3';
mainLinkFX.volume = .1;
playLinkSoundFX(mainLinks, mainLinkFX);

/////////////////////////////////////////////////////////////////////////////////////////

const mainBtn = document.querySelector('#maimBlockBtn');
const visualizerBtn = document.querySelector('.visualizer-btn').style;
const visualizerBtnAddClass = document.querySelector('.visualizer-btn');
const mainMusic = new Audio;
mainMusic.src = '../sounds/musicTitle/auff_muzika_v_mashinu_2020_-_maffei_nack_-_take_my_bass_(zf.fm).mp3';
mainMusic.volume = .15;
musicPlayAndVisual(mainBtn, visualizerBtn, mainMusic, visualizerBtnAddClass);

//////////////////////////////////////////////////////////////////////////////////////////

const audioFile = document.querySelector('#main-audio');
const playAndPause = document.querySelector('.play-pause');
const playIcon = document.querySelector('#play-song');
const pauseIcon = document.querySelector('#pause-song');
const diode = document.querySelector('.diode');
musicPlayer(audioFile, playAndPause, playIcon, pauseIcon, diode);

/////////////////////////////////////////////////////////////////////////////////////////

const btnOpenAudioPlayer = document.querySelector('.audio-player');
const btnBackToTitle = document.querySelectorAll('#back-to-title');
const pageAudioPlayer = document.querySelector('.wrapper-audio');

btnOpenAudioPlayer.addEventListener('click', () => {
    pageAudioPlayer.classList.toggle('active');
    mainMusic.pause();
    if(visualizerBtnAddClass.classList.contains('dance')){
        visualizerBtnAddClass.classList.remove('dance');
    }
});

//////////////////////////////////////////////////////////////////////////////////////

const btnOpenGames = document.querySelector('.games');
const gameMenu = document.querySelector('.web-menu');

btnOpenGames.addEventListener('click', () => {
    gameMenu.classList.add('active');
});

const btnOpenApps = document.querySelector('.apps');
const appMenu = document.querySelector('.app-menu');

btnOpenApps.addEventListener('click', () => {
    appMenu.classList.add('active');
});

btnBackToTitle.forEach(thisItem => {
    if(thisItem.getAttribute('data-num') == 1){
        thisItem.onclick = () => {
            btnOpenAudioPlayer.click();
            audioFile.pause();
            pauseIcon.style.display = 'none';
            playIcon.style.display = 'block';
            diode.classList.remove('active');
        } 
    }
    else if(thisItem.getAttribute('data-num') == 2){
        thisItem.onclick = () => {
            gameMenu.classList.remove('active');
        }
        
    }
    else if(thisItem.getAttribute('data-num') == 3){
        thisItem.onclick = () => {
            appMenu.classList.remove('active');
        }
    } else {
        return
    }
})


interfaceLogic.clock();
interfaceLogic.calendar();
interfaceLogic.navPanel();


// document.addEventListener('keypress', (e) => {
//     console.log(e);
// })

