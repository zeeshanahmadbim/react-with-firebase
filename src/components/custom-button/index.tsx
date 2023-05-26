import { PropsWithChildren } from 'react';

import styles from './styles.module.scss';

import { Button, ButtonProps } from 'reactstrap';

type CustomButtonProps = ButtonProps & {
    varient: 'light'
}

function CustomButton({children, varient, ...props}:PropsWithChildren<CustomButtonProps>){
    return <Button {...props} className={`${styles.btn} ${styles[varient]}`}>{children}</Button>
    
}

export {CustomButton}