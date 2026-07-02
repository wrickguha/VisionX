import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || Math.random().toString(36).substring(2, 9);
    
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-neutral-slate-600 tracking-wide select-none">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-neutral-slate-400 pointer-events-none select-none">
              {leftIcon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full text-sm rounded-xl border bg-white py-2.5 transition-all duration-200 focus:outline-none placeholder-neutral-slate-400
              ${leftIcon ? 'pl-10' : 'pl-4'}
              ${rightIcon ? 'pr-10' : 'pr-4'}
              ${
                error
                  ? 'border-danger-500 focus:ring-2 focus:ring-danger-500/20 focus:border-danger-500'
                  : 'border-neutral-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10'
              }
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 text-neutral-slate-400 pointer-events-none select-none">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p className="text-xs text-danger-500 font-medium leading-none mt-0.5">{error}</p>
        )}
        {!error && helperText && (
          <p className="text-[11px] text-neutral-slate-400 leading-normal mt-0.5">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
