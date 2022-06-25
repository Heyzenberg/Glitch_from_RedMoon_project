import { allMusic } from "./modules/playlist.js";


const glitchPlayer = document.querySelector('.music-player-body');
const coverSong = glitchPlayer.querySelector('.image-area img');
const nameSong = glitchPlayer.querySelector('.audio-details .song-title');
const artistSong = glitchPlayer.querySelector('.audio-details .artist');
const audioFile = glitchPlayer.querySelector('#main-audio');
audioFile.volume = .3;

const playAndPause = glitchPlayer.querySelector('.play-pause');
const playIcon = glitchPlayer.querySelector('#play-song');
const pauseIcon = glitchPlayer.querySelector('#pause-song');
const prevSong = glitchPlayer.querySelector('#prev-song');
const nextSong = glitchPlayer.querySelector('#next-song');
const progressArea = glitchPlayer.querySelector('.progress-area');
const progressBar = glitchPlayer.querySelector('.progress-bar');
const musicList = glitchPlayer.querySelector('.playlist');
const showMusicListBtn = glitchPlayer.querySelector('#list-song');
const hideMusicListBtn = musicList.querySelector('#close');

let musicIndex = 1;


window.addEventListener('load', () => {
    loadMusic(musicIndex);
    playingNow();
});

const loadMusic = (audioID) => {
    nameSong.innerText = allMusic[audioID - 1].nameSong;
    artistSong.innerText = allMusic[audioID - 1].artist;
    coverSong.src = `../img/Glitch_player/${allMusic[audioID - 1].cover}.webp`;
    audioFile.src = `../sounds/Glitch_player/${allMusic[audioID - 1].src}.mp3`;
};

const playOrPause = () => {
    playAndPause.addEventListener('click', () => {
        if(audioFile.paused === true){
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            audioFile.play();
        }
        else{
            pauseIcon.style.display = 'none';
            playIcon.style.display = 'block';
            audioFile.pause();
        }
    });    
};
playOrPause();


const prevAndNext = {
    prevSong: prevSong.onclick = () => {
                if(musicIndex < 2){
                    musicIndex = allMusic.length;
                    loadMusic(musicIndex);
                    playIcon.style.display = 'none';
                    pauseIcon.style.display = 'block';
                    audioFile.play();
                }else{
                    musicIndex--;
                    loadMusic(musicIndex);
                    playIcon.style.display = 'none';
                    pauseIcon.style.display = 'block';
                    audioFile.play();
                }
            },
        
    nextSong: nextSong.onclick = () => {
                if(musicIndex > allMusic.length-1){
                    musicIndex = 1;
                    loadMusic(musicIndex);
                    playIcon.style.display = 'none';
                    pauseIcon.style.display = 'block';
                    audioFile.play();
                }else{
                    musicIndex++;
                    loadMusic(musicIndex);
                    playIcon.style.display = 'none';
                    pauseIcon.style.display = 'block';
                    audioFile.play();
                }
            },
};


const progressBarAndTimeSong = () => {
    let currentProgress = glitchPlayer.querySelector('.current-progress');
    let musicDuration = glitchPlayer.querySelector('.duration');

    audioFile.addEventListener('timeupdate', (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        let progtessWidth = (currentTime / duration) * 100;
        progressBar.style.width = `${progtessWidth}%`;

        audioFile.addEventListener('loadeddata', () => {
            let audioDuration = audioFile.duration;
            let totalMin = Math.floor(audioDuration / 60);
            let totalSec = Math.floor(audioDuration % 60);
            if(totalSec < 10){
                totalSec = `0${totalSec}`;
            }
            musicDuration.innerText = `${totalMin}:${totalSec}`;
        });
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if(currentSec < 10){
            currentSec = `0${currentSec}`;
        }
        currentProgress.innerText = `${currentMin}:${currentSec}`;  
    })
};
progressBarAndTimeSong();

const useProgressBar = () => {
    progressArea.addEventListener('click', (e) => {
        let progressWidthValue = progressArea.clientWidth;
        let clickedOffsetX = e.offsetX;
        let songDuration = audioFile.duration;

        audioFile.currentTime = (clickedOffsetX / progressWidthValue) * songDuration;
    })
};
useProgressBar();



const repeatBtn = glitchPlayer.querySelector('#repeat-playlist');

const repeatAndShuffle = () => {
    repeatBtn.addEventListener('click', () => {
        let getText = repeatBtn.innerText;

        switch(getText){
            case 'repeat':
                repeatBtn.innerText = 'repeat_one';
                repeatBtn.setAttribute('title', 'Song looped');
                break;
            case 'repeat_one':
                repeatBtn.innerText = 'shuffle';
                repeatBtn.setAttribute('title', 'Playback shuffle');
                break;
            case 'shuffle':
                repeatBtn.innerText = 'repeat';
                repeatBtn.setAttribute('title', 'Playlist looped');
                break;
        }
    });
    audioFile.addEventListener('ended', () => {
        let getText = repeatBtn.innerText;

        switch(getText){
            case 'repeat':
                prevAndNext.nextSong();
                break;
            case 'repeat_one':
                audioFile.currentTime = 0;
                loadMusic(musicIndex);
                audioFile.play();
                break;
            case 'shuffle':
                let randomIndex = Math.floor((Math.random() * allMusic.length) + 1);
                do{
                    randomIndex = Math.floor((Math.random() * allMusic.length) + 1);
                }while(musicIndex == randomIndex);
                musicIndex = randomIndex;
                loadMusic(musicIndex);
                audioFile.play();
                break;
        }
    });
};
repeatAndShuffle();




const useMusicList = () => {
    const ulTag = glitchPlayer.querySelector('ul');

    (function showHideMusicList() {
        showMusicListBtn.addEventListener('click', () => {
            musicList.classList.toggle('show');
        });
        hideMusicListBtn.addEventListener('click', () => {
            showMusicListBtn.click();
        });        
    })();

    (function showDurationMusic() {
        for( let i = 0; i < allMusic.length; i++){
            let liTag = `<li li-index="${i + 1}">
                            <div class="row">
                                <p>${allMusic[i].nameSong}</p>
                                <p>${allMusic[i].artist}</p>
                            </div>
                            <audio class="${allMusic[i].src}" src="../sounds/Glitch_player/${allMusic[i].src}.mp3"></audio>
                            <span id="${allMusic[i].src}" class='audio-duration'></span>
                        </li>`;
            ulTag.insertAdjacentHTML('beforeend', liTag);

            let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);
            let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

            liAudioTag.addEventListener('loadeddata', () => {
                let audioDuration = liAudioTag.duration;
                let totalMin = Math.floor(audioDuration / 60);
                let totalSec = Math.floor(audioDuration % 60);
                if(totalSec < 10){
                    totalSec = `0${totalSec}`;
                }
                liAudioDuration.innerText = `${totalMin}:${totalSec}`;
            });
        };        
    })();

    const allLiTags = ulTag.querySelectorAll('li');

    function playingNow(){
        for( let v = 0; v < allLiTags.length; v++ ){
            if(allLiTags[v].classList.contains('playing')){
                allLiTags[v].classList.remove('playing');
            }
            else if(allLiTags[v].getAttribute('li-index') == musicIndex){
                allLiTags[v].classList.add('playing');
            }
            allLiTags[v].setAttribute('onclick', 'clicked(this)');
        };        
    };

    (function clickedLiElement(element){
        let getLiIndex = element.getAttribute('li-index');
        musicIndex = getLiIndex;
        loadMusic(musicIndex);
        audioFile.play();
        playingNow()
    })();
};
useMusicList();