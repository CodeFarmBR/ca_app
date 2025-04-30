import { View, Text, StyleSheet, Alert, Button } from "react-native";

import { MyButton } from "@/components/button";
import { Input } from "@/components/input";
import { useState } from "react";
import { router } from "expo-router";

export default function Index() {
	const [name, setName] = useState("");

	function handleNext() {
		router.navigate("/dashboard");
	}

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Olá, {name} </Text>

			<Input onChangeText={setName} />

			<MyButton activeOpacity={0.8} title="Enviar" onPress={handleNext} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 32,
		justifyContent: "center",
		gap: 16,
	},
	text: {
		fontSize: 24,
		color: "#453478",
		fontWeight: "bold",
	},
});
