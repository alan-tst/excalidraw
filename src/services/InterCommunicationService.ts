export interface InterCommunication {
  init(): void;
  disconnect(): void;
  sendMessage(message: any): void;
  isListening(): boolean;
}

class InterCommunicationService implements InterCommunication {
  private targetOrigin: string;
  private handleMessageCallback: (data: any) => void;
  private listenerAttached: boolean = false;

  constructor(
    targetOrigin: string,
    handleMessageCallback: (data: any) => void,
  ) {
    this.targetOrigin = targetOrigin;
    this.handleMessageCallback = handleMessageCallback;
    // this.initializeMessageListener();
  }

  private initializeMessageListener() {
    if (this.listenerAttached) {
      return;
    }

    window.addEventListener("message", this.handleMessage);
    this.listenerAttached = true;
  }

  init() {
    this.initializeMessageListener();
  }

  disconnect() {
    window.removeEventListener("message", this.handleMessage);
  }

  isListening() {
    return this.listenerAttached;
  }

  private handleMessage = (event: MessageEvent) => {
    if (event.origin !== this.targetOrigin) {
      return;
    }

    const { data } = event;
    // console.log("Received message from Vue.js:", data);
    this.handleMessageCallback(data);
  };

  sendMessage(message: any) {
    window.parent.postMessage(message, this.targetOrigin);
  }
}

export default InterCommunicationService;
