import React from 'react';

const Number = ({
	width = 400,
	height = 40,
	placeholder = '',
	name,
	value,
	onChange,
	className = '',
	disabled,
}) => {
	return (
		<input
			type='number'
			id={name}
			name={name}
			value={value}
			onChange={onChange}
			className={`input ${className}`}
			placeholder={placeholder}
			disabled={disabled}
			style={{
				width: width,
				height: height,
			}}
			autoComplete='off'
		/>
	);
};

export default Number;
