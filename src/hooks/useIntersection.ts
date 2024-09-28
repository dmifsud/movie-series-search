import { useEffect, useState } from 'react';

function useIntersection(
    element: React.MutableRefObject<HTMLElement>,
    rootMargin: string | undefined
) {
    const [isVisible, setState] = useState(false);
    useEffect(() => {
        const current = element?.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setState(entry.isIntersecting);
            },
            { rootMargin }
        );
        current && observer?.observe(current);

        return () => current && observer.unobserve(current);
    }, []);

    return isVisible;
}

export default useIntersection;
