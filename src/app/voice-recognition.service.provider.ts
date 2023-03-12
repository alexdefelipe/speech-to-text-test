import {VoiceRecognitionService} from "./voice-recognition.service";

export const voiceRecognitionServiceFactory = () => {
  const voiceRecognitionService = new VoiceRecognitionService();
  voiceRecognitionService.recognition.lang = "es-ES";
  voiceRecognitionService.recognition.addEventListener('result', (e: any) => {
    const transcript = Array.from(e.results)
      .map((result: any) => result[0])
      .map((result) => result.transcript)
      .join('');
    voiceRecognitionService.processRecognitionResult(transcript)
  });

  voiceRecognitionService.recognition.addEventListener('end', (condition: any) => {
    voiceRecognitionService.processEndRecognition();
  });
  return voiceRecognitionService;
}
