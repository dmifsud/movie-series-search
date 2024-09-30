import { PropsWithChildren } from 'react';

function FallbackMessage({ children }: PropsWithChildren) {
    return (
        <p className="flex justify-center text-primary items-center h-full">
            {children}
        </p>
    );
}

export default FallbackMessage;
