import {Component, OnInit} from '@angular/core';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lang = 'es-ES';
  recognition = new webkitSpeechRecognition();
  recording = false;
  records: string[] = [];
  temporalRecord = "";
  currentRecord = "";
  startRecordDate = new Date().valueOf();
  recordingElapsedTime = 0;
  constructor() {
  }

  ngOnInit(): void {
    this.recognition.lang = this.lang;

    this.recognition.addEventListener('result', (e: any) => {
      console.log(e);
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.temporalRecord = transcript;
      console.log(transcript)
    });
  }

  onStartRecording() {
    setInterval(() => {
      this.recordingElapsedTime = new Date().valueOf() - this.startRecordDate;
    });
    this.toggleRecordingFlag();
    this.start();
  }

  onStopRecording() {
    this.toggleRecordingFlag();
    this.recognition.stop();
  }

  start() {
    this.startRecordDate = new Date().valueOf();
    this.recognition.start();
    this.recognition.addEventListener('end', (condition: any) => {
      if (!this.recording) {
        this.recognition.stop();
        console.log(condition)
        this.concatTemporalRecord()
        this.addRecord()
      } else {
        this.concatTemporalRecord()
        this.recognition.start();
      }
    });
  }

  private toggleRecordingFlag() {
    this.recording = !this.recording;
  }

  concatTemporalRecord() {
    this.currentRecord += ` ${this.temporalRecord}`;
  }

  private addRecord() {
    console.log(this.records);
    console.log(this.temporalRecord);
    this.records = [...this.records, `${new Date().toLocaleString()}: ${this.currentRecord}`];
    this.currentRecord = '';
  }

  onLanguageChange(event: any) {
    console.log(event)
  }
}
