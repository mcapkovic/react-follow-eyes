import React, {useReducer} from 'react';

function useForceUpdate(){
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    return () => <button onClick={()=>forceUpdate()}>Force update</button>
}

export default useForceUpdate;