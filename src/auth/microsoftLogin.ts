import * as AuthSession from "expo-auth-session";

export const getRedirectUri = () => {
	const redirectUri = AuthSession.makeRedirectUri();

	console.log("Redirect URI:", redirectUri);
	return redirectUri;
};
