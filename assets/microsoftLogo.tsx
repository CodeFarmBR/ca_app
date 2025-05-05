import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export default function MicrosoftLogo(props) {
	return (
		<Svg
			width={40}
			height={40}
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<G clipPath="url(#clip0_1166_129)">
				<Path d="M19.01 19.006H0V0h19.01v19.006z" fill="#F1511B" />
				<Path d="M40 19.006H20.99V0h19.01v19.006H40z" fill="#80CC28" />
				<Path d="M19.01 40H0V20.994h19.01V40z" fill="#00ADEF" />
				<Path d="M40 40H20.99V20.994h19.01V40H40z" fill="#FBBC09" />
			</G>
			<Defs>
				<ClipPath id="clip0_1166_129">
					<Path fill="#fff" d="M0 0H40V40H0z" />
				</ClipPath>
			</Defs>
		</Svg>
	);
}
