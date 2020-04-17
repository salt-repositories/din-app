import * as signalR from "@aspnet/signalr";
import { HubConnection } from "@aspnet/signalr";

export abstract class Hub {
    private connection: HubConnection;
    private listeners: string[];

    protected constructor(accessToken: string, endpoint: string) {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(`${process.env.API_URL}/hubs/${endpoint}`,
                {
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets,
                    accessTokenFactory: () => accessToken,
                })
            .build();
        this.listeners = [];
    }

    public isConnected(): boolean {
        return this.connection.state === signalR.HubConnectionState.Connected;
    }

    public async disconnect() {
        this.listeners = [];
        await this.connection.stop();
    }

    protected async callMethod(method: string) {
        await this.openConnection();
        await this.connection.send(method);
    }

    protected createListener(method: string, func: (response) => void) {
        if (!this.listeners.find((item) => item === method)) {
            this.listeners.push(method);
            this.connection.on(method, func);
        }
    }

    private async openConnection() {
        if (this.connection.state === signalR.HubConnectionState.Disconnected) {
            await this.connection.start().catch((error) => console.log(error));
        }
    }
}
