import { AuthService as MedusaAuthService } from "@medusajs/medusa";
import { Lifetime } from "awilix";
import { AuthenticateResult } from "@medusajs/medusa/dist/types/auth";

type ExtendedAuthenticateResult = AuthenticateResult & {
    wallet_address?: string; // Optional property
};

export default class AuthService extends MedusaAuthService {
    static LIFE_TIME = Lifetime.SINGLETON;

    constructor(container) {
        super(container);
        // Assuming you have additional setup or properties to include
    }

    // Overload to keep the original authenticate method signature
    async authenticate(email: string, password: string): Promise<AuthenticateResult>;
    // Custom method signature for handling authentication with wallet address
    async authenticate(email: string, password: string, wallet_address?: string): Promise<ExtendedAuthenticateResult>;
    // Unified method implementation
    async authenticate(email: string, password: string, wallet_address?: string): Promise<ExtendedAuthenticateResult | AuthenticateResult> {
        const authResult: AuthenticateResult = await super.authenticate(email, password);

        // Handle the wallet address logic separately, depending on your application's needs
        // This could be adding the wallet address to the user's profile, logging it, etc.
        // For demonstration, just adding it to the result if provided
        if (wallet_address) {
            const extendedResult: ExtendedAuthenticateResult = { ...authResult, wallet_address };
            console.log(`Authentication succeeded, wallet address: ${wallet_address}`);
            return extendedResult;
        }

        return authResult;
    }
}
