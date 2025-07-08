const ColorBlock = ({ color }: { color: string }) => {
	return (
		<div
			className={`w-10 h-10 rounded-md`}
			aria-hidden="true"
			style={{ backgroundColor: color }}
		/>
	);
};

export default ColorBlock;
