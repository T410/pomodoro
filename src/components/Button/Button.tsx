import React, { ReactElement } from "react";

function Button({
	children,
	onClick,
	disabled,
}: {
	children: React.ReactNode;
	onClick: () => void;
	disabled?: boolean;
}) {
	let className = "w-fit h-16 md:h-20 hover:cursor-pointer rounded border-b-4 transition-all";
	if (disabled) {
		className += " bg-gray-600 border-b-gray-600";
	} else {
		className += " active:border-b-orange-600 hover:border-orange-400 bg-orange-600 border-b-orange-700";
	}
	const _onClick = (e: React.MouseEvent) => {
		e.preventDefault();

		disabled || onClick();
	};
	return (
		<div className={className} onClick={_onClick}>
			{React.Children.map(children, (child) => {
				return React.cloneElement(child as React.ReactElement, {
					//clone classname
					className: `${(child as ReactElement).props.className} ${disabled ? "cursor-default" : ""}`,
				});
			})}
		</div>
	);
}

export default Button;
