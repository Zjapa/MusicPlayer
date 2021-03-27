class Player {
  constructor() {
    this.padsContainer = document.querySelector(".pads").children;
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.hihatAudio = document.querySelector(".hihat-audio");
    this.clapAudio = document.querySelector(".clap-audio");
    this.kickAudio = document.querySelector(".kick-audio");
    this.index = 1;
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

// FOR EVERY PAD ON PLAYER ADD/REMOVE CLASS ON CLICK
musicPlayer.pads.forEach((pad) => {
  pad.addEventListener("click", function () {
    this.classList.contains("active")
      ? this.classList.remove("active")
      : this.classList.add("active");
  });
});

musicPlayer.playBtn.addEventListener("click", () => {
  musicPlayer.loop();
});
