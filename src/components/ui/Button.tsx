interface ButtonProps extends React.ButtonHTMLAttributes<{}> {
    variant?: 'primary' | 'secondary';
}

function Button({ children, className, variant, ...rest }: ButtonProps) {
    return (
        <button
            className={`${className} py-2 px-4 border-2 border-solid border-primary rounded-md text-lg hover:bg-secondary-light`}
            {...rest}
        >
            {children}
        </button>
    );
}

export default Button;
