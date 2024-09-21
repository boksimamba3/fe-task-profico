import { ComponentPropsWithoutRef } from 'react';

import classes from './divider.module.scss';

export function Divider({ className, ...props }:ComponentPropsWithoutRef<'hr'>) {
    return (
        <hr {...props} className={`${classes.divider} ${className}`}/>
    );
}
