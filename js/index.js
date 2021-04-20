class Player {
  constructor() {
    this.padsContainer = document.querySelector(".pads").children;
    this.pads = document.querySelectorAll(".pad");
    this.muteButtons = document.querySelectorAll(".mute");
    this.playBtn = document.querySelector(".play");
    this.hihatAudio = document.querySelector(".hihat-audio");
    this.clapAudio = document.querySelector(".clap-audio");
    this.kickAudio = document.querySelector(".kick-audio");
    this.slider = document.getElementById("slider");
    this.tempoTitle = document.querySelector(".tempo-speed");
    this.index = 0;
    this.isPlaying = false;
    this.interval;
    this.selects = document.querySelectorAll("select");
    this.bpm = 150;
  }

  play() {
    const speed = (60 / this.bpm) * 1000;
    this.interval = setInterval(() => {
      let step = this.index % this.padsContainer.length;
      const currentPads = document.querySelectorAll(`.b${step}`);
      currentPads.forEach((pad) => this.checkClass(pad));
      this.index++;
    }, speed);
  }

  checkClass(pad) {
    pad.style.animation = "padPop .3s alternate ease-in-out 2";
    const speed = 60 / this.bpm;
    if (pad.classList.contains("active")) {
      if (pad.parentElement.classList.contains("kick-pads")) {
        this.kickAudio.currentTime = 0;
        this.kickAudio.play();
      }
      if (pad.parentElement.classList.contains("clap-pads")) {
        this.clapAudio.currentTime = 0;
        this.clapAudio.play();
      }
      if (pad.parentElement.classList.contains("hihat-pads")) {
        this.hihatAudio.currentTime = 0;
        this.hihatAudio.play();
      }
    }
  }

  changeSound(newSound) {
    const { name: selectName, value: selectValue } = newSound.target;

    switch (selectName) {
      case "kick-beats":
        this.kickAudio.src = selectValue;
        break;
      case "clap-beats":
        this.clapAudio.src = selectValue;
        break;
      case "hihat-beats":
        this.hihatAudio.src = selectValue;
        break;
    }
  }

  sliderHandler(e) {
    if (this.isPlaying) {
      clearInterval(this.interval);
      this.play();
    }
  }
  sliderText(e) {
    this.tempoTitle.innerText = e.target.value;
    this.bpm = e.target.value;
  }
}

const musicPlayer = new Player();

musicPlayer.muteButtons.forEach((muteBtn) => {
  muteBtn.addEventListener("click", () => {
    if (muteBtn.classList.contains("mute-kick")) {
      if (muteBtn.classList.contains("muted")) {
        musicPlayer.kickAudio.muted = false;
        muteBtn.classList.remove("muted");
      } else {
        muteBtn.classList.add("muted");
        musicPlayer.kickAudio.muted = true;
      }
    } else if (muteBtn.classList.contains("mute-clap")) {
      if (muteBtn.classList.contains("muted")) {
        musicPlayer.clapAudio.muted = false;
        muteBtn.classList.remove("muted");
      } else {
        muteBtn.classList.add("muted");
        musicPlayer.clapAudio.muted = true;
      }
    } else if (muteBtn.classList.contains("mute-hihat")) {
      if (muteBtn.classList.contains("muted")) {
        musicPlayer.hihatAudio.muted = false;
        muteBtn.classList.remove("muted");
      } else {
        muteBtn.classList.add("muted");
        musicPlayer.hihatAudio.muted = true;
      }
    }
  });
});

musicPlayer.pads.forEach((pad) => {
  pad.addEventListener("click", () => {
    pad.classList.toggle("active");
  });
  pad.addEventListener("animationend", () => {
    pad.style.animation = "";
  });
});

musicPlayer.playBtn.addEventListener("click", () => {
  if (!musicPlayer.isPlaying) {
    musicPlayer.play();
    musicPlayer.isPlaying = true;
    musicPlayer.playBtn.textContent = `Stop`;
  } else {
    clearInterval(musicPlayer.interval);
    musicPlayer.playBtn.textContent = `Play`;
    musicPlayer.isPlaying = false;
  }
});

musicPlayer.selects.forEach((select) => {
  select.addEventListener("change", (e) => {
    musicPlayer.changeSound(e);
  });
});

musicPlayer.slider.addEventListener("input", (e) => {
  musicPlayer.sliderText(e);
});

musicPlayer.slider.addEventListener("change", (e) => {
  musicPlayer.sliderHandler(e);
});
