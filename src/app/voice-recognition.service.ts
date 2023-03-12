import {Injectable, Output} from '@angular/core';
import {BehaviorSubject} from "rxjs";

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {
  recognition = new webkitSpeechRecognition();
  lang = 'es-ES';
  temporalTranscript = "";
  isRecording = false;
  isRecordingSubject = new BehaviorSubject<boolean>(false);
  transcript = "";
  transcriptSubject = new BehaviorSubject<string>("");

  constructor() {
    this.recognition.lang = this.lang;
  }

  startRecognition() {
    console.log("Start recording");
    this.recognition.start();
    this.toggleRecordingStatus();
  }

  stopRecognition() {
    console.log("Stop recording");
    this.toggleRecordingStatus();
    this.recognition.stop();
  }

  processRecognitionResult(transcript: string) {
    this.temporalTranscript = transcript;
    this.concatTemporalRecord();
  }

  processEndRecognition() {
    if (!this.isRecording) {
      this.emitRecord()
    } else {
      this.concatTemporalRecord()
      this.recognition.start();
    }
  }

  changeLanguage(language: string) {
    this.lang = language;
    this.recognition.lang = language;
  }

  private toggleRecordingStatus() {
    this.isRecording = !this.isRecording;
    this.isRecordingSubject.next(this.isRecording);
  }

  private emitRecord() {
    // this.concatTemporalRecord();
    this.transcriptSubject.next(this.transcript);
    this.transcript = "";
  }

  private concatTemporalRecord() {
    this.transcript += ` ${this.temporalTranscript}`;
  }
}


