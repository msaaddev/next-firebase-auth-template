import css from 'styles/Input.module.css';

const Input = ({ htmlFor, label, type, autoFocus, value, onChange, err }) => {
	return (
		<div className={css.wrapper}>
			<label htmlFor={htmlFor}>{label}</label>
			<br />
			<input
				type={type}
				autoFocus={autoFocus}
				required
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			{err !== '' && <p className={css.err}>{err}</p>}
		</div>
	);
};

export default Input;
