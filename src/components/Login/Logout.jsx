import {clearUser} from "../../actions/user";

const {useDispatch} = require("react-redux");
const {useEffect} = require("react");

const Logout = ({history}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.removeItem('token');
        dispatch(clearUser());
        history.push('/');
    }, []);

    return null;
}

export default Logout;