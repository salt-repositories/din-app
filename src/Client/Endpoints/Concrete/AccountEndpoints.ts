import { Endpoints } from "..";
import { Account, AddedContent } from "../../../Models";
import {ApiVersions} from "../../Versions/Concrete/Versions";

export class AccountEndpoints extends Endpoints {
    constructor(version: ApiVersions) {
        super(version, "accounts");
    }

    public async getAccounts(): Promise<Account[]> {
        throw new Error("Not yet implemented");
    }

    public async getAccountById(id: string): Promise<Account> {
        throw new Error("Not yet implemented");
    }

    public async createAccount(account: Account): Promise<void> {
        throw new Error("Not yet implemented");
    }

    public async updateAccount(/* Json patch doc */): Promise<Account> {
        throw new Error("Not yet implemented");
    }

    public async deleteAccountById(id: string): Promise<void> {
        throw new Error("Not yet implemented");
    }

    public async activateAccount(authorizationCode: string): Promise<void> {
        throw new Error("Not yet implemented");
    }

    public async getAddedContent(id: string): Promise<AddedContent[]> {
        throw new Error("Not yet implemented");
    }
}
