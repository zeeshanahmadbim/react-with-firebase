import { PropsWithChildren } from "react";
import { useFirebaseContext } from "../../providers/firebaseProvider";
import { Button, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, Navbar, NavbarBrand, UncontrolledDropdown } from "reactstrap";
import { handleSignOut } from "../../helpers/firebase";

import styles from './styles.module.scss';

function Layout({children}:PropsWithChildren){
    const {googleAuth, currentUser}  = useFirebaseContext();
    
    return <>
        <Navbar className={styles.container}  light>
            <NavbarBrand href="/" color="light">Todo List</NavbarBrand>
            <Nav pills>
                {currentUser ? 
                    <UncontrolledDropdown nav  className={styles.dropdown}>
                        <DropdownToggle caret>
                        <span>{currentUser?.displayName}</span>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={handleSignOut}>Logout</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown> :
                    <NavItem>
                        <Button onClick={googleAuth}>Sign in</Button>
                    </NavItem>
                }
            </Nav>
        </Navbar>
        {children}
    </>
}

export { Layout }