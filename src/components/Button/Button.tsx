function Button({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
	return (
		<div
			className="w-fit h-16 md:h-20 hover:cursor-pointer bg-orange-600 border-b-orange-700 rounded border-b-4 active:border-b-orange-600 transition-all hover:border-orange-400"
			onClick={onClick}
		>
			{children}
		</div>
	);
}

export default Button;
