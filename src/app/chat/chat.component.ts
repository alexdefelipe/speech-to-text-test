import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {VoiceRecognitionService} from "../voice-recognition.service";
import {voiceRecognitionServiceFactory} from "../voice-recognition.service.provider";
import {Subscription} from "rxjs";

declare var watsonAssistantChatOptions: any;
declare global {
  interface Window {
    watsonAssistantChatOptions: any;
  }
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [
    {
      provide: VoiceRecognitionService,
      useFactory: voiceRecognitionServiceFactory
    }
  ]
})
export class ChatComponent implements OnInit {
  subscriptions: Subscription[] = []
  private watsonTextArea: HTMLElement | null = null;
  private watsonContainer: HTMLElement | null = null;
  private watsonSendButton: HTMLElement | null = null;

  constructor(private renderer2: Renderer2,
              @Inject(DOCUMENT) private _document: Document,
              private voiceRecognitionService: VoiceRecognitionService) {
  }

  ngOnInit(): void {
    this.subscriptions = [
      this.voiceRecognitionService.transcriptSubject.subscribe(record => this.onTranscriptEmitted(record))
    ]

    window.watsonAssistantChatOptions = {
      integrationID: "d80ff516-a201-41ee-a56d-93879f63a59e",
      region: "eu-gb",
      serviceInstanceID: "b73c90db-14db-49a3-adf9-207d3349bab9",
      onLoad: (instance: any) => {
        instance.render().then(() => {
          setTimeout(() => this.addVoiceButtonToChat(), 1000);
        });
      }
    };

    const loadWatsonScript = this.renderer2.createElement('script');
    loadWatsonScript.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/latest/WatsonAssistantChatEntry.js";
    this.renderer2.appendChild(this._document.body, loadWatsonScript);
  }

  private addVoiceButtonToChat() {
    this.watsonTextArea = this._document.getElementById("WAC__inputContainer-TextArea");
    this.watsonSendButton = this._document.getElementById("WAC__send-button");
    this.watsonContainer = this._document.getElementById("WAC__inputContainer-TextAreaContainer");

    const voiceBtn = this.getVoiceButton();

    if (this.watsonContainer) {
      this.watsonContainer.insertBefore(voiceBtn, this.watsonSendButton);
    }
  }

  private getVoiceButton() {
    const voiceBtn = this.renderer2.createElement('button');
    voiceBtn.innerHTML = '<span class="material-icons blue-color">mic</span>';
    voiceBtn.classList.add("WAC__send-button", "WAC__button--base", "WAC__button--primary");
    voiceBtn.addEventListener("mousedown", (e: Event) => {
      e.preventDefault();
      this.voiceRecognitionService.startRecognition()
    });
    voiceBtn.addEventListener("touchstart", (e: Event) => {
      e.preventDefault();
      this.voiceRecognitionService.startRecognition()
    });
    voiceBtn.addEventListener("mouseup", () => {
      this.voiceRecognitionService.stopRecognition();
      this.watsonSendButton?.classList.remove("disabled");
    });
    voiceBtn.addEventListener("touchend", () => {
      this.voiceRecognitionService.stopRecognition();
      this.watsonSendButton?.classList.remove("disabled");
    });
    voiceBtn.style.userSelect = "none";
    return voiceBtn;
  }

  private onTranscriptEmitted(record: string) {
    if (!record.trim()) {
      return;
    }

    this._document.getElementById("");
    if (!this.watsonTextArea) {
      return;
    }

    this.watsonTextArea.innerHTML = record;
    this.watsonTextArea.focus();
  }
}
