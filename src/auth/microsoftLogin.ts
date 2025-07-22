import { makeRedirectUri } from "expo-auth-session";

export const getRedirectUri = () => {
	const redirectUri = makeRedirectUri();

	return redirectUri;
};
