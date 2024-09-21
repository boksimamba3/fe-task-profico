import { ComponentPropsWithoutRef } from 'react';

import classes from './button.module.scss';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    color?: 'primary' | 'secondary' | 'light' | 'dark';
    variant?: 'text' | 'contained';
}

export function Button({ children, className, color = 'primary', variant ='contained', ...props }: ButtonProps) {
    const colorClass = color ? classes[`button--${color}`] : '';
    const variantClass = variant ? classes[`button--${variant}`] : '';

    return (
        <button
            {...props}
            className={`${classes.button} ${className} ${colorClass} ${variantClass}`}
        >
            {children}
        </button>
    );
}
