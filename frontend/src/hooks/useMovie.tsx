import type { URLParams } from "../models/urlParams";

const key = import.meta.env.VITE_OMDB_API_KEY;

export function useOnlineStatus(params: URLParams | undefined) {
    if(!params){
        
    }
  
  useEffect(() => {
    
    return () => {
      
    };
  }, []);
  return isOnline;
}