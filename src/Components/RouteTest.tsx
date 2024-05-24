
import { Link } from "react-router-dom";

const RoustTest = () => {
    return (
        <div>
            <Link to={"/"}><input className="join-item btn btn-square" type="radio" name="options" aria-label="1" checked /></Link>
            <Link to={"/Setting"}><input className="join-item btn btn-square" type="radio" name="options" aria-label="2" checked /></Link>
        </div>

    );
};

export default RoustTest;

/*mport { Link } from "react-router-dom";

const RoustTest = () => {
    return (
        <div>
            <Link to={"/"}>Home</Link>
            <br />
            <Link to={"/Edit"}>Edit</Link>
            <br />
        </div>
    );
};

export default RoustTest;
*/