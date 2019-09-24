import ApiClient from "./ApiClient";

export class ApiClientProvider {
    public static getClient() {
        if (!this.instance) {
            this.instance = new ApiClient();
        }

        return this.instance;
    }

    private static instance: ApiClient;
}
