import Svg, { Path, type SvgProps } from "react-native-svg"

export function BuildingOfficeIcon(props: SvgProps) {
	return (
		<Svg fill="none" height={64} viewBox="0 0 65 64" width={65} {...props}>
			<Path
				d="M62.5 53h-5V23h1a1 1 0 000-2h-13V11h1a1 1 0 000-2h-36a1 1 0 000 2h1v42h-5a1 1 0 000 2h56a1 1 0 000-2zm-7-30v30h-10V23h10zm-42-12h30v42h-8V40a1 1 0 00-1-1h-12a1 1 0 00-1 1v13h-8V11zm20 42h-10V41h10v12zm-14-33a1 1 0 011-1h4a1 1 0 010 2h-4a1 1 0 01-1-1zm12 0a1 1 0 011-1h4a1 1 0 010 2h-4a1 1 0 01-1-1zm-11 11a1 1 0 010-2h4a1 1 0 010 2h-4zm11-1a1 1 0 011-1h4a1 1 0 010 2h-4a1 1 0 01-1-1z"
				fill="#5F5F5F"
			/>
		</Svg>
	)
}
