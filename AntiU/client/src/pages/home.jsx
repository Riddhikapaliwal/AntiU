import { Link } from "react-router";


function Home(){
    return (
    <div>
    <h1>This is the home page.</h1>
    <Link to="/profileSetup">Profile Setup</Link>
    </div>
    )
}
export default Home;