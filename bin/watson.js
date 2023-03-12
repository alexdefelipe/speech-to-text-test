window.watsonAssistantChatOptions = {
  integrationID: "d80ff516-a201-41ee-a56d-93879f63a59e",
  region: "eu-gb",
  serviceInstanceID: "b73c90db-14db-49a3-adf9-207d3349bab9",
  onLoad: function (instance) {
    instance.render();
  }
};
setTimeout(function () {
  const t = document.createElement('script');
  t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
  document.head.appendChild(t);
});
