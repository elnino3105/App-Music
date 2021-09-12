const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// getElement DOM
const playlist = $('.playlist')
const cd =$('.cd')
const heading = $('header marquee')
const cdThumb = $('.cd-thumb')
const audio =$('#audio')
const playBtn = $('.btn-toggle-play')
/* const player = $('.player') */
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const btnRandom = $('.btn-random')
const btnRepeat = $('.btn-repeat')
const progressDuration = $(".progress__duration")
const progressCurrent = $(".progress__current")

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
          name: 'Nevada',
          singer: 'Vicetone',
          path: './music/Nevada-Vicetone-4494556.mp3',
          image: './img/nevada.jpg',
        },
        {
          name: 'Light It Up',
          singer: 'Robin Hustin x TobiMorrow',
          path: './music/LightItUp-RobinHustinTobimorrowJex-5619031.mp3',
          image: './img/light.jpg',
        },
        {
          name: 'Yoru ni kakeru',
          singer: 'YOASOBI',
          path: './music/YoruNiKakeru-YOASOBI-6149490.mp3',
          image: './img/Yoru ni kakeru.png',
        },
        {
          name: 'Muộn rồi mà sao còn',
          singer: 'Sơn Tùng M-TP',
          path: './music/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3',
          image: './img/MuonRoiMaSao.jpg',
        },
        {
          name: 'See You Again',
          singer: 'Charlie Puth ft Wiz Khalifa',
          path: './music/SeeYouAgain-KurtSchneiderEppicAlexGoot-3888930.mp3',
          image: './img/see-you-again-0.jpg',
        },
       
        {
          name: 'Symphony',
          singer: 'Clean Bandit',
          path: './music/Symphony-CleanBanditZaraLarsson-4822950.mp3',
          image: './img/Symphony.jpg',
        },
        {
          name: 'Waiting For Love',
          singer: 'Avicii',
          path: './music/WaitingForLove-Avicii-4203283.mp3',
          image: './img/avici.jpg',
        },
        {
          name: 'Alone',
          singer: 'Marshmello',
          path: './music/Alone-Marshmello-4456939.mp3',
          image: './img/alone.jpg',
        },
        {
          name: 'Something Just Like This',
          singer: 'The Chainsmokers & Coldplay',
          path: './music/SomethingJustLikeThis-TheChainsmokersColdplay-5337136.mp3',
          image: './img/Something Just Like This.jpg',
        },
        {
          name: 'Sugar',
          singer: 'Maroon 5',
          path: './music/Sugar-Maroon5-3338455.mp3',
          image: './img/sugar.jpg',
        },
        {
          name: 'Nevada',
          singer: 'Vicetone',
          path: './music/Nevada-Vicetone-4494556.mp3',
          image: './img/nevada.jpg',
        },
        {
          name: 'Light It Up',
          singer: 'Robin Hustin x TobiMorrow',
          path: './music/LightItUp-RobinHustinTobimorrowJex-5619031.mp3',
          image: './img/light.jpg',
        },
        {
          name: 'Yoru ni kakeru',
          singer: 'YOASOBI',
          path: './music/YoruNiKakeru-YOASOBI-6149490.mp3',
          image: './img/Yoru ni kakeru.png',
        },
        {
          name: 'Muộn rồi mà sao còn',
          singer: 'Sơn Tùng M-TP',
          path: './music/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3',
          image: './img/MuonRoiMaSao.jpg',
        },
        {
          name: 'See You Again',
          singer: 'Charlie Puth ft Wiz Khalifa',
          path: './music/SeeYouAgain-KurtSchneiderEppicAlexGoot-3888930.mp3',
          image: './img/see-you-again-0.jpg',
        },
       
        {
          name: 'Symphony',
          singer: 'Clean Bandit',
          path: './music/Symphony-CleanBanditZaraLarsson-4822950.mp3',
          image: './img/Symphony.jpg',
        },
        {
          name: 'Waiting For Love',
          singer: 'Avicii',
          path: './music/WaitingForLove-Avicii-4203283.mp3',
          image: './img/avici.jpg',
        },
        {
          name: 'Alone',
          singer: 'Marshmello',
          path: './music/Alone-Marshmello-4456939.mp3',
          image: './img/alone.jpg',
        },
        {
          name: 'Something Just Like This',
          singer: 'The Chainsmokers & Coldplay',
          path: './music/SomethingJustLikeThis-TheChainsmokersColdplay-5337136.mp3',
          image: './img/Something Just Like This.jpg',
        },
        
    ],
    render : function(){
      const htmls = this.songs.map((song,index) => {
        return `
        <div class="song ${index === this.currentIndex ? 'active' : '' } " data-index="${index}">
          <div class="thumb" style="background-image: url('${song.image}')">
          </div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
        `
      })
      playlist.innerHTML = htmls.join('\n')

    },
    // define properties
    
    defineProperties: function () {
      Object.defineProperty(this, "currentSong", {
        get: function () {
          return this.songs[this.currentIndex];
        }
      });
    },
    
    // event
    
    handleEvents: function() {
      const cdWidth = cd.offsetWidth 
      document.onscroll = function(){
        const scrollTop = document.documentElement.scrollTop ;
        const newCdWidth = cdWidth - scrollTop
        cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' :0
        cd.style.opacity = newCdWidth/cdWidth
      }
      // handle CD when spins / stop
      const cdThumbAnimate = cdThumb.animate([
        {transform: 'rotate(360deg)'}
      ],{duration:30000,
        iterations:Infinity,
      })
      cdThumbAnimate.pause();
      // when click play
      const _this = this 
      playBtn.onclick = function(){
        if(_this.isPlaying){
          audio.pause()
          cdThumbAnimate.pause();
        }
        else { 
        audio.play()
        cdThumbAnimate.play();
        }
      }
      // when the song is player
      audio.onplay = function(){
        playBtn.classList.add('playing')
        _this.isPlaying = true
        
      }
      // when the song is pause
      audio.onpause = function(){
        playBtn.classList.remove('playing')
        _this.isPlaying = false
      }
      // When the song progress changes
      audio.ontimeupdate = function () {
        if (audio.duration) {
          const progressPercent = Math.floor(
            (audio.currentTime / audio.duration) * 100
          );
          progress.value = progressPercent;
        }
        _this.timeCurrent()
        _this.timeDuration()
      };
      // Handling when seek
      progress.oninput = function (e) {
        audio.currentTime = (audio.duration * e.target.value / 100)
      };
      
      // when click random
      btnRandom.onclick = function(){
        _this.isRandom = !_this.isRandom
       btnRandom.classList.toggle('active',_this.isRandom)
       
      }
      // when click repeat
      btnRepeat.onclick = function(){
        _this.isRepeat = !_this.isRepeat
        btnRepeat.classList.toggle('active',_this.isRepeat)
      }

      // next song
      nextBtn.onclick = function(){
        if(_this.isRandom){
          _this.playRandomSong()
        }
        else{
          _this.nextSong()
          
        }
        audio.play()
        cdThumbAnimate.play();
        _this.scrollToActiveSong()
      }
      // prev song
      prevBtn.onclick = function(){
        if(_this.isRandom){
          _this.playRandomSong()
        }else{
          _this.prevSong()
        }
        audio.play()
        cdThumbAnimate.play();
        _this.scrollToActiveSong()
      }
      // when song end
      audio.onended = function(){
        if(_this.isRepeat){
          audio.play()
        }
        else
        {
          nextBtn.click()
        }
      }
      // click playlist song 
      playlist.onclick = function (e) {
        
        let songNode = e.target.closest('.song:not(.active)');
        if(songNode && !e.target.closest('.option')){
          _this.currentIndex = Number(songNode.dataset.index)
          console.log(_this.currentIndex)
          _this.loadCurrentSong()
          audio.play()
          _this.render()
        }
      };
    },
    nextSong: function () {
      this.currentIndex++;
      if (this.currentIndex > this.songs.length - 1) {
        this.currentIndex = 0;
      }
      this.loadCurrentSong();
      
    },
    prevSong: function () {
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = this.songs.length - 1;
      }
      this.loadCurrentSong();
    },
    playRandomSong: function(){
      let newIndex
      do{
        newIndex  = Math.floor(Math.random() * this.songs.length)
      }while(this.currentIndex === newIndex)
      this.currentIndex = newIndex;
      this.loadCurrentSong();
    },
    loadCurrentSong : function(){
      heading.textContent = this.currentSong.name;
      cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
      audio.src = this.currentSong.path;
      if ($('.song.active')) {
        $('.song.active').classList.remove('active');
      }
      const list = $$('.song');
      list.forEach((song) => {
        if (song.getAttribute('data-index') == this.currentIndex) {
          song.classList.add('active');
        }
      });
    },
    scrollToActiveSong: function () {
      setTimeout(() => {
        if (this.currentIndex <= 0) {
          $('.song.active').scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
        } else {
          $('.song.active').scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          });
        }
      }, 300);
    },
    // Time update
    formatTime: function (sec_num) {
      let hours = Math.floor(sec_num / 3600);
      let minutes = Math.floor((sec_num - hours * 3600) / 60);
      let seconds = Math.floor(sec_num - hours * 3600 - minutes * 60);
  
      hours = hours < 10 ? (hours > 0 ? '0' + hours : 0) : hours;
  
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      return (hours !== 0 ? hours + ':' : '') + minutes + ':' + seconds;
    },
    
    timeCurrent: function () {
      setInterval(() => {
        let cur = this.formatTime(audio.currentTime)
        progressCurrent.textContent = `${cur}`;
      }, 100)
    },
    
    timeDuration: function () {
      if (audio.duration) {
        let dur = this.formatTime(audio.duration)
        progressDuration.textContent = `${dur}`;
      }
    },
    
    start: function(){
      this.defineProperties()
      this.handleEvents()
      this.render()
      this.loadCurrentSong()
      
    }
}
app.start()