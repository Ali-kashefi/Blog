"use clientt";

import Link from 'next/link'
import { usePathname } from 'next/navigation'
function NavLink({path, children}) {
    const patname = usePathname();
    return (
        <Link href={path}
            className={`block py-2 hover:text-secondary-900 transition-all ease-out 
            ${patname == path ? "text-primary-900 " : ""}`}>
            {children}
        </Link>
    )
}

export default NavLink

