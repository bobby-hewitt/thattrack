import React, { useContext, useEffect} from 'react'
import {useRoutes} from 'hookrouter';
import Context from 'context'

import { Home, NotFound, Tracks, Room, Instructions } from 'Containers'
import { Cursor, Loader } from 'Components'


const routes = {
    '/': () => <Room />,
    '/tracks': () => <Tracks />,
    '/instructions': () => <Instructions />,
};
  
const MyApp = () => {
	const state = useContext(Context);
	const routeResult = useRoutes(routes);

    return(
	    <div>
	    	<Loader loading={state.loading}/>
	    	{routeResult || <NotFound />}
	    </div>
    )
}

export default MyApp