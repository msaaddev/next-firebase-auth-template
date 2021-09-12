import css from 'styles/Button.module.css';

const Button = ({ label, onClick }) => {
	return (
		<button className={css.button} onClick={onClick}>
			{label}
		</button>
	);
};

export default Button;
