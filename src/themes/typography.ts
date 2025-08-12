import { StyleSheet } from "react-native"
import { colors } from "./colors"

export const typography = StyleSheet.create({
	headingXl: {
		fontSize: 28,
		fontFamily: "RalewayBold",
		fontWeight: "700",
		color: colors.gray900,
	},
	headingLg: {
		fontSize: 24,
		fontFamily: "RalewayBold",
		fontWeight: "700",
		color: colors.gray900,
	},
	headingMd: {
		fontSize: 20,
		fontFamily: "RalewayBold",
		fontWeight: "700",
		color: colors.gray900,
	},
	headingSmBold: {
		fontSize: 18,
		fontFamily: "RalewayRegular",
		fontWeight: "700",
		color: colors.gray900,
	},
	headingXs: {
		fontSize: 16,
		fontFamily: "RalewayRegular",
		fontWeight: "600",
		color: colors.gray900,
	},
	bodyLg: {
		fontSize: 16,
		fontFamily: "NotoSans",
		fontWeight: "300",
		color: colors.gray900,
	},
	bodyLgBold: {
		fontSize: 16,
		fontFamily: "NotoSans",
		fontWeight: "700",
		color: colors.gray900,
	},
	bodyMd: {
		fontSize: 13,
		fontFamily: "NotoSans",
		fontWeight: "500",
		color: colors.gray900,
	},
	bodySm: {
		fontSize: 10,
		fontFamily: "NotoSans",
		fontWeight: "500",
		color: colors.gray900,
	},
	button: {
		fontSize: 16,
		fontFamily: "NotoSans",
		fontWeight: "400",
		color: colors.gray900,
	},
})
