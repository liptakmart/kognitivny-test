import { Component, OnInit } from '@angular/core';

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const TIME_VAL : number = 180;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  /**
   * arr of image indexes
   */
  showedImgIndexes : string[] = [];

  /**
   * number of images repeated
   */
  totalImagesRepeats : number = 0;

  /**
   * number of images repeated spotted and clicked
   */
  repeatsHited : number = 0;

  countdownTimerLabel : string = TIME_VAL.toString();
  currentCountdownTime : number = TIME_VAL;
  countdownInterval : any = null;

  isStartButtonDisabled : boolean = false;
  isStopButtonDisabled : boolean = true;

  changeImageInterval : any = null;

  currentImageSrc : string = "";

  isShowIntro : boolean = true;
  isShowResult : boolean = false;

  progressBarValue : number = 0;

  /**
   * if current image is a repeat
   */
  isCurrentImageARepeat : boolean = false;

  //assets/lion.jpg
  constructor() { }

  ngOnInit() {
  }

  startTest(){
    this.isShowIntro = false;
    this.isShowResult = false;
    this.isStartButtonDisabled = true;
    this.isStopButtonDisabled = false;
    this.progressBarValue = 0;
    this.countdownTimerLabel = TIME_VAL.toString();
    this.currentCountdownTime = TIME_VAL;
    this.showedImgIndexes = [];
    this.totalImagesRepeats = 0;
    this.repeatsHited = 0;

    this.changeImage();
    // update countdown
    this.countdownInterval = setInterval(() => {
      this.updateCountdownLabel();
    }, 200);

    this.changeImageInterval = setInterval(() => {
      this.changeImage();
    }, 2000);
  }

  stopTest(){
    this.isShowIntro = true;
    this.isShowResult = false;
    this.isStartButtonDisabled = false;
    this.isStopButtonDisabled = true;
    this.countdownTimerLabel = TIME_VAL.toString();
    this.currentCountdownTime = TIME_VAL;
    this.currentImageSrc = '';
    this.progressBarValue = 0;

    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }

    if (this.changeImageInterval) {
      clearInterval(this.changeImageInterval);
      this.changeImageInterval = null;
    }
  }

  imageClicked(){
    console.log("image clicked!");
    
    if (this.changeImageInterval) {
      clearInterval(this.changeImageInterval);
      this.changeImageInterval = null;
    }

    if (this.isCurrentImageARepeat){
      this.repeatsHited++;
      this.isCurrentImageARepeat = false; // to not allow repeat click
    }

    this.changeImage();

    this.changeImageInterval = setInterval(() => {
      this.changeImage();
    }, 2000);
  }

  updateCountdownLabel(){
    this.currentCountdownTime -= 0.2;
    this.countdownTimerLabel = `${Math.ceil(this.currentCountdownTime)}`;
    this.progressBarValue += 20;
    if (this.currentCountdownTime <= 0){
      this.showResults();
    }
  }

  showResults(){
    this.isShowIntro = false;
    this.isShowResult = true;
    this.isStartButtonDisabled = false;
    this.isStopButtonDisabled = true;
    this.countdownTimerLabel = '0';
    this.currentCountdownTime = 0;
    this.currentImageSrc = '';
    this.progressBarValue = 0;

    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }

    if (this.changeImageInterval) {
      clearInterval(this.changeImageInterval);
      this.changeImageInterval = null;
    }
  }

  changeImage(){
    this.progressBarValue = 0;

    let idx : number = randomIntFromInterval(1, 25);
    this.currentImageSrc = `assets/${idx}.jpg`;

    // if repeat
    if (this.showedImgIndexes[idx.toString()]){
      this.totalImagesRepeats++;
      this.isCurrentImageARepeat = true;
    }else{
      this.isCurrentImageARepeat = false;
    }

    this.showedImgIndexes[idx.toString()] = idx.toString();

    console.log(this.showedImgIndexes);
  }
}
