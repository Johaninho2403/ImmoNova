import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Search from '../pages/Search'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import SingleProperty from '../pages/SingleProperty'
import AddProperty from '../pages/AddProperty'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: '/search',
                element: <Search />
            },
            {
                path: "/signin",
                element: <SignIn />
            },
            {
                path: "/signup",
                element: <SignUp />
            },
            {
                path: '/property/:id',
                element: <SingleProperty />
            },
            {
                path: "/add-property",
                element: <AddProperty />
            }
        ]
    }
])

export default router