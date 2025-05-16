import { View, Text, StyleSheet, Alert, Button } from "react-native";

import { MyButton } from "@/components/button";
import { Input } from "@/components/input";
import { useState } from "react";
import { router } from "expo-router";

import { typography } from "@/theme/typography";
import { colors } from "@/theme/colors";
("@/theme/colors");

export default function Login() {

	function handleNext() {
		router.navigate("/dashboard");
	}

	return (
		<View style={styles.base}>
			<Text style={[typography.headingLg, { color: colors.gray900 }]}>Nome do App</Text>

			<View style={styles.container}>
				<Input placeholder="Nome"/>
				<MyButton activeOpacity={0.8} title="Enviar" onPress={handleNext} />

			</View>


		</View>
	);
}

const styles = StyleSheet.create({
	base: {
		flex: 1,
		width: '100%',
		padding: 32,
		justifyContent: "flex-start",
		alignItems: 'center',
		gap: 200,
	},
	container: {
		width: '100%',
		gap: 12
	}
});
