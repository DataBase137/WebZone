import Link from "next/link";

const Navbar = () => {
    return ( 
        <nav className="nav">
            <h3 className="logo">WebZone</h3>
            <ul className="links">
                    <li>
                        <Link href="/"><a>Home</a></Link>
                    </li>
                </ul>
                <button className="sign-up-btn btn" onClick={() => {console.log("\"Sign Up\" button clicked!")}}><span>Sign Up </span></button>
        </nav>
     );
}
 
export default Navbar;