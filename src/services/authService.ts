import { dataStore } from "../data/store";
import { LoginRequest, LoginResponse } from "../types/auth";

export class AuthService {
	static login(credentials: LoginRequest): LoginResponse | null {
		const user = dataStore.users.find((u) => u.email === credentials.email);
		if (!user || credentials.password !== "password") {
			return null;
		}

		const accessToken =
			"access-token-" + Date.now() + "-" + Math.random().toString(36);
		const refreshToken =
			"refresh-token-" + Date.now() + "-" + Math.random().toString(36);

		const expiresAt = new Date();
		expiresAt.setHours(expiresAt.getHours() + 1);

		dataStore.sessions.set(accessToken, { userId: user.id, expiresAt });

		return {
			user,
			accessToken,
			refreshToken,
		};
	}
}
