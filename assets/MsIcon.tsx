import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

export function MsIcon(props: SvgProps) {
	return (
		<Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
			<G clipPath="url(#clip0_1166_141)">
				<Path d="M9.505 9.503H0V0h9.505v9.503z" fill="#F1511B" />
				<Path d="M20 9.503h-9.505V0h9.504v9.503H20z" fill="#80CC28" />
				<Path d="M9.505 20H0v-9.503h9.505V20z" fill="#00ADEF" />
				<Path d="M20 20h-9.505v-9.503h9.504V20H20z" fill="#FBBC09" />
			</G>
			<Defs>
				<ClipPath id="clip0_1166_141">
					<Path fill="#fff" d="M0 0H20V20H0z" />
				</ClipPath>
			</Defs>
		</Svg>
	);
}
