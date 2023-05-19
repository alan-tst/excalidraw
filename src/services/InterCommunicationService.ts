class InterCommunicationService {
  private targetOrigin: string;
  private handleMessageCallback: (data: any) => void;

  constructor(
    targetOrigin: string,
    handleMessageCallback: (data: any) => void,
  ) {
    this.targetOrigin = targetOrigin;
    this.handleMessageCallback = handleMessageCallback;
    this.initializeMessageListener();
  }

  private initializeMessageListener() {
    window.addEventListener("message", this.handleMessage);
  }

  disconnect() {
    window.removeEventListener("message", this.handleMessage);
  }

  private handleMessage = (event: MessageEvent) => {
    if (event.origin !== this.targetOrigin) {
      return;
    }

    const { data } = event;
    console.log("Received message from Vue.js:", data);
    this.handleMessageCallback(data);
  };

  sendMessage(message: any) {
    window.parent.postMessage(message, this.targetOrigin);
  }
}

export default InterCommunicationService;
