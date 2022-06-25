import { allMusic } from "./playlist.js";

const musicPlayer = (audioFile, playAndPause, playIcon, pauseIcon, diode) => {
    const glitchPlayer = document.querySelector('.music-player-body');
    const coverSong = glitchPlayer.querySelector('.image-area img');
    const nameSong = glitchPlayer.querySelector('.audio-details .song-title');
    const artistSong = glitchPlayer.querySelector('.audio-details .artist');

    const smartBtn = document.querySelector('.smart-button');
    const prevSong = glitchPlayer.querySelector('#prev-song');
    const nextSong = glitchPlayer.querySelector('#next-song');
    const btnVolUp = document.querySelector('#volUp');
    const btnVolDown = document.querySelector('#volDown');

    const progressArea = glitchPlayer.querySelector('.progress-area');
    const progressBar = glitchPlayer.querySelector('.progress-bar');
    const musicList = glitchPlayer.querySelector('.playlist-body');
    const showMusicListBtn = glitchPlayer.querySelector('#list-song');
    const hideMusicListBtn = musicList.querySelector('#close');

    const volumeBox = document.querySelector('.volume-box');
    const volumeBar = document.querySelector('.volume-bar');

    let musicIndex = 1;
    
    window.addEventListener('load', () => {
        loadMusic(musicIndex);
        playingNow();
    });

''
    const loadMusic = (audioID) => {
        nameSong.innerText = allMusic[audioID - 1].nameSong;
        artistSong.innerText = allMusic[audioID - 1].artist;
        coverSong.src = `../img/Glitch_player/${allMusic[audioID - 1].cover}.webp`;
        audioFile.src = `../sounds/Glitch_player/${allMusic[audioID - 1].src}.mp3`;
    };


    const exlzrColumn_1 = document.querySelector('#exlzrColumn-1').style;
    const exlzrColumn_2 = document.querySelector('#exlzrColumn-2').style;
    const exlzrColumn_3 = document.querySelector('#exlzrColumn-3').style;
    const exlzrColumn_4 = document.querySelector('#exlzrColumn-4').style;
    const exlzrColumn_5 = document.querySelector('#exlzrColumn-5').style;
    
    let contextAudio;
    let analyserAudio;

    function preparationAudio(){
        contextAudio = new AudioContext();
        analyserAudio = contextAudio.createAnalyser();
        const srcAudio = contextAudio.createMediaElementSource(audioFile);
        srcAudio.connect(analyserAudio);
        analyserAudio.connect(contextAudio.destination);
        visualization();
    }

    function visualization(){
        const arrayAudio = new Uint8Array(analyserAudio.frequencyBinCount);
        
        if(!audioFile.paused){
            window.requestAnimationFrame(visualization);
        }
        analyserAudio.getByteFrequencyData(arrayAudio);
        exlzrColumn_1.height = ((arrayAudio[0]) / 3) + "%";
        exlzrColumn_2.height = ((arrayAudio[60]) / 3) + "%";
        exlzrColumn_3.height = ((arrayAudio[128]) / 3) + "%";
        exlzrColumn_4.height = ((arrayAudio[210]) / 3) + "%";
        exlzrColumn_5.height = ((arrayAudio[500]) / 2) + "%";
    }

    const playOrPause = () => {
        playAndPause.addEventListener('click', () => {
            if(!contextAudio){
                preparationAudio();
            }
            if(audioFile.paused){
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
                diode.classList.add('active');
                audioFile.play();
                playingNow();
                visualization();
            } else {
                pauseIcon.style.display = 'none';
                playIcon.style.display = 'block';
                diode.classList.remove('active');
                audioFile.pause();
                playingNow();
            }
            playingNow();
        });
    }
    playOrPause();


    smartBtn.onclick = () => {
        playAndPause.click();
    }

    const prevAndNext = {
        prevSong: prevSong.onclick = () => {
                    if(!contextAudio){
                        preparationAudio();
                    }
                    if(musicIndex < 2){
                        musicIndex = allMusic.length;
                        loadMusic(musicIndex);
                        playIcon.style.display = 'none';
                        pauseIcon.style.display = 'block';
                        diode.classList.add('active');
                        audioFile.play();
                        visualization();
                    }else{
                        musicIndex--;
                        loadMusic(musicIndex);
                        playIcon.style.display = 'none';
                        pauseIcon.style.display = 'block';
                        diode.classList.add('active');
                        audioFile.play();
                        visualization();
                    }
                    playingNow();
                },
            
        nextSong: nextSong.onclick = () => {
                    if(!contextAudio){
                        preparationAudio();
                    }
                    if(musicIndex > allMusic.length-1){
                        musicIndex = 1;
                        loadMusic(musicIndex);
                        playIcon.style.display = 'none';
                        pauseIcon.style.display = 'block';
                        diode.classList.add('active');
                        audioFile.play();
                        visualization();
                    }else{
                        musicIndex++;
                        loadMusic(musicIndex);
                        playIcon.style.display = 'none';
                        pauseIcon.style.display = 'block';
                        diode.classList.add('active');
                        audioFile.play();
                        visualization();
                    }
                    playingNow();
                },
    };


    let vol = 0.3;
    audioFile.volume = vol;
    volumeBar.innerHeight = `${vol * 100}%`;
    volumeBar.style.height = volumeBar.innerHeight;

    let interval = 8000;

    let hideVolumeBar = (interval) => {
        setTimeout(() =>{
            volumeBox.classList.remove('show');
        }, interval)
    };

    btnVolUp.addEventListener('click', () => {
        volumeBox.classList.add('show');
        if(vol < 1){
            vol += 0.1;
            vol = vol.toFixed(1);
            vol = Number(vol);
            audioFile.volume = vol;
            volumeBar.innerHeight = `${vol * 100}%`;
            volumeBar.style.height = volumeBar.innerHeight;
            hideVolumeBar(interval);
        }
        else if(vol = 1){
            return;
        }
        clearTimeout(hideVolumeBar);
    });

    btnVolDown.addEventListener('click', () => {
        volumeBox.classList.add('show');
        if(vol > 0){
            vol -= 0.1;
            vol = vol.toFixed(1);
            vol = Number(vol);
            audioFile.volume = vol;
            volumeBox.classList.add('show');
            volumeBar.innerHeight = `${vol * 100}%`;
            volumeBar.style.height = volumeBar.innerHeight;
            hideVolumeBar(interval);
        }
        else if(vol = 0){
            return;
        }
        clearTimeout(hideVolumeBar);
    });


    const ulTag = glitchPlayer.querySelector('ul');

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
                for( let j = 0; j < allMusic.length; j++ ){
                    let liAudioDuration = ulTag.querySelector(`#${allMusic[j].src}`);

                    liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
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

            if(!contextAudio){
                preparationAudio();
            }
            audioFile.currentTime = (clickedOffsetX / progressWidthValue) * songDuration;
            diode.classList.add('active');
            audioFile.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            visualization();
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
                    diode.classList.add('active');
                    audioFile.play();
                    break;
                case 'shuffle':
                    let randomIndex = Math.floor((Math.random() * allMusic.length) + 1);
                    do{
                        randomIndex = Math.floor((Math.random() * allMusic.length) + 1);
                    }while(musicIndex == randomIndex);
                    musicIndex = randomIndex;
                    loadMusic(musicIndex);
                    diode.classList.add('active');
                    audioFile.play();
                    playingNow()
                    break;
            }
        });
    };
    repeatAndShuffle();


    // const ulTag = glitchPlayer.querySelector('ul');

    function showHideMusicList() {
        showMusicListBtn.addEventListener('click', () => {
            musicList.classList.toggle('show');
        });
        hideMusicListBtn.addEventListener('click', () => {
            showMusicListBtn.click();
            });        
    };
    showHideMusicList()


    const addLiTag = () => {
        for( let i = 0; i < allMusic.length; i++ ){
            let liTag = `<li li-index="${i + 1}">
                            <div class="row">
                                <p>${allMusic[i].nameSong}</p>
                                <p>${allMusic[i].artist}</p>
                            </div>
                            <audio class="${allMusic[i].src}" src="../sounds/Glitch_player/${allMusic[i].src}.mp3"></audio>
                            <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
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
    };
    addLiTag();


    const allLiTags = ulTag.querySelectorAll('li');

    function playingNow(){
        for (let v = 0; v < allLiTags.length; v++) {
            let audioTag = allLiTags[v].querySelector('.audio-duration');
            let a = '♫'
            let simbolPlay = a;

            if (allLiTags[v].classList.contains('playing')){
                allLiTags[v].classList.remove('playing');
                let addDuration = audioTag.getAttribute('t-duration')
                audioTag.innerText = addDuration;
            }
            else if (allLiTags[v].getAttribute('li-index') == musicIndex){
                allLiTags[v].classList.add('playing');
                audioTag.innerText = `${simbolPlay}`;
            }
        };      
    };

    allLiTags.forEach(liTag => {
        liTag.addEventListener('click', () => {
            let getLiIndex = liTag.getAttribute('li-index');
            if(!contextAudio){
                preparationAudio();
            }
            musicIndex = getLiIndex;
            loadMusic(musicIndex);
            diode.classList.add('active');
            audioFile.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            playingNow();
            visualization();
        })
    });
};

export { musicPlayer };