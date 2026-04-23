import { Link } from 'react-router-dom';

const variantClasses = {
primary:
  "bg-[#dfb3b9] text-zinc-900 hover:bg-[#e48c9d] shadow-[0_0_10px_rgba(228,140,157,0.35)] hover:shadow-[0_0_18px_rgba(228,140,157,0.6)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]",
secondary:
  "bg-[#e48c9d] text-zinc-900 font-bold hover:bg-[#6B8754]/50 hover:text-[#13220d] shadow-[0_0_10px_rgba(228,140,157,0.25)] hover:shadow-[0_0_18px_rgba(107,135,84,0.5)] transition-all duration-300",
  };

const Button = ({
    children,
    to,
    type = 'button',
    variant = 'secondary',
    className = '',
}) => {
    const classes = [
        'inline-flex items-center justify-center rounded-full border-2 border-zinc-900 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition',
        variantClasses[variant] ?? variantClasses.secondary,
        className,
      ]
        .join(' ')
        .trim();

    if (to) {
        return (
            <Link to={to} className={classes}>    
                {children}
            </Link>
        );
      }

      return (
        <button type={type} className={classes}>
            {children}
        </button>
    );
  };

    
export default Button;