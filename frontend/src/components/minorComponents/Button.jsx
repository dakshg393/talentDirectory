const Button = ({ children, onClick, variant = 'primary', className = '', icon: Icon, disabled, loading, type = 'button' }) => {
  const variants = {
    primary: "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-violet-500/25 border border-white/10",
    secondary: "bg-white/10 dark:bg-slate-800 hover:bg-black/5 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 backdrop-blur-md",
    };
  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} className={`flex items-center justify-center p-[2.5] md:px-5 md:py-2.5 rounded-xl font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none tracking-wide cursor-pointer ${variants[variant]} ${className}`}>
      {loading ? <Loader2 size={18} className="mr-2 animate-spin" /> : Icon && <Icon size={18} className="mr-2" />}
      {children}
    </button>
  );
};

export default Button