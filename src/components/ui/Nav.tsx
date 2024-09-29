import { PropsWithChildren } from 'react';

function Nav({ children }: PropsWithChildren) {
    return <nav className="p-6 bg-primary text-white">{children}</nav>;
}

export default Nav;
