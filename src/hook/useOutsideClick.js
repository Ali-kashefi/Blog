import { useEffect, useRef } from "react";



function useOutsideClick(handler, listenCapturing = true) {
    const ref = useRef();
    useEffect(() => {
        function handlerClicke(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                handler();
            }
           
        }
        document.addEventListener("click", handlerClicke, listenCapturing)
        return () => {document.removeEventListener('click', handlerClicke, listenCapturing)};

    }, [handler])
    return ref
}
export default useOutsideClick;