import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
    const router = useRouter();
    
    return ( 
        <nav className="nav-container">
            <div className="nav">
                <h3 className="logo">WebZone</h3>
                <ul className="links">
                    <li>
                        <Link href="/"><a>Home</a></Link>
                    </li>
                    <li>
                        <Link href="/login"><a>Login</a></Link>
                    </li>
                </ul>
                <button className="sign-up-btn btn" onClick={() => {router.push("/signup")}}><span>Sign Up </span></button>
            </div>
        </nav>
     );
}
 
export default Navbar;