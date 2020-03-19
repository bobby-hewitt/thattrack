import React, { useContext, useEffect} from 'react'
import {useRoutes} from 'hookrouter';
import Context from 'context'
import { Join, NotFound, Waiting, WaitingStart, Playlist, AnswerInput } from 'Containers'
import { Cursor, Loader } from 'Components'
const routes = {
    '/': () => <Join />,
    '/waiting': () => <Waiting />,
    '/playlist': () => <Playlist />,
    '/waiting-start': () => <WaitingStart />,
    '/input': () => <AnswerInput />,
};
  
const MyApp = () => {
	const state = useContext(Context)
	const routeResult = useRoutes(routes);
	
    return(
	    <div>
	    	<Loader loading={state.loading}/>
	    	{routeResult || <NotFound />}
	    </div>
    )
}

export default MyApp