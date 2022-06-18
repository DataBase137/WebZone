import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
    const router = useRouter();

    return (
        <div className="nav-container">
            <header>
                <h3 className="logo">WebZone</h3>
                <input type="checkbox" id="nav-toggle" className="nav-toggle" />
                <nav>
                    <ul>
                        <li><Link href="/"><a>Home</a></Link></li>
                        <li><Link href="/login"><a>Login</a></Link></li>
                    </ul>
                    <button className="sign-up-btn btn" onClick={() => { router.push("/signup") }}><span>START NOW </span></button>
                </nav>
                <label htmlFor="nav-toggle" className="nav-toggle-label">
                    <span></span>
                </label>
            </header>
        </div>
    );
}

export default Navbar;