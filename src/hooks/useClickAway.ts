import { useEffect, useRef } from "react";

export function useClickAway(ref:React.RefObject<HTMLElement>, callback:()=>void) {
  useEffect(() => {
    function handleClickOutside(event:MouseEvent) {
      // Check if the click happened outside of the referenced element
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        callback();
      }
    }

    // Bind the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);
    
    // Clean up the listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}
