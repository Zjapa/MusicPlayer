class Player {
  constructor() {
    this.padsContainer = document.querySelector(".pads").children;
    this.pads = document.querySelectorAll(".pad");
    this.muteButtons = document.querySelectorAll(".mute");
    this.playBtn = document.querySelector(".play");
    this.hihatAudio = document.querySelector(".hihat-audio");
    this.clapAudio = document.querySelector(".clap-audio");
    this.kickAudio = document.querySelector(".kick-audio");
    this.index = 0;
    this.isPlaying = false;
  }

  loop() {
    setInterval(() => {
      let loop = this.index % this.padsContainer.length;
      if (loop <= this.padsContainer.length) {
        this.pads.forEach((pad) => {
          if (
            pad.classList.contains(`b${loop}`) &&
            pad.classList.contains("active")
          ) {
            if (pad.parentElement.classList.contains("kick-pads")) {
              this.kickAudio.play();
            }
            if (pad.parentElement.classList.contains("clap-pads")) {
              this.clapAudio.play();
            }
            if (pad.parentElement.classList.contains("hihat-pads")) {
              this.hihatAudio.play();
            }
          }
        });
      }
      this.index++;
    }, 500);
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
  pad.addEventListener("click", function () {
    this.classList.contains("active")
      ? this.classList.remove("active")
      : this.classList.add("active");
  });
});

musicPlayer.playBtn.addEventListener("click", () => {
  if (!musicPlayer.isPlaying) {
    musicPlayer.loop();
    musicPlayer.isPlaying = true;
  }
});
