import useIntersection from '@hooks/useIntersection';
import { useRef, useEffect } from 'react';

function VisibleElement({ isVisible }: { isVisible: () => void }) {
    const triggerRef = useRef(document.createElement('span'));
    const visible = useIntersection(triggerRef, '0px');

    useEffect(() => {
        if (visible) {
            isVisible();
        }
    }, [isVisible, visible]);

    return <span ref={triggerRef}></span>;
}

export default VisibleElement;
