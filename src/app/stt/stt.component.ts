import {Component, OnDestroy} from '@angular/core';
import {VoiceRecognitionService} from "../voice-recognition.service";
import {voiceRecognitionServiceFactory} from "../voice-recognition.service.provider";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-stt',
  templateUrl: './stt.component.html',
  styleUrls: ['./stt.component.css'],
  providers: [
    {
      provide: VoiceRecognitionService,
      useFactory: voiceRecognitionServiceFactory
    }
  ]
})
export class SttComponent implements OnDestroy {
  lang = 'es-ES';
  recording = false;
  records: string[] = [];
  startRecordDate = new Date().valueOf();
  recordingElapsedTime = 0;
  subscriptions: Subscription[];

  constructor(private voiceRecognitionService: VoiceRecognitionService) {
    this.subscriptions = [
      voiceRecognitionService.isRecordingSubject.subscribe(isRecording => this.setIsRecording(isRecording)),
      voiceRecognitionService.transcriptSubject.subscribe(record => this.onTranscriptEmitted(record))
    ]
  }

  onStartClick() {
    this.startRecordDate = new Date().valueOf();
    setInterval(() => {
      this.recordingElapsedTime = new Date().valueOf() - this.startRecordDate;
    });
    this.voiceRecognitionService.startRecognition();
  }

  onStopClick() {
    this.voiceRecognitionService.stopRecognition();
  }

  private onTranscriptEmitted(record: string) {
    if (!record.trim()) {
      return;
    }

    this.addRecord(record)
  }

  private addRecord(record: string) {
    this.records = [...this.records, `${new Date().toLocaleString()}: ${record}`];
  }

  onLanguageChange(language: string) {
    console.log(language)
    this.voiceRecognitionService.changeLanguage(language);
  }

  private setIsRecording(isRecording: boolean) {
    console.log(`Currently recording: ${this.recording}. Changing recording status to ${isRecording}`);
    this.recording = isRecording;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
