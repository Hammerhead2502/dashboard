import styles from "@/styles/Login.module.css"
import Link from "next/link";

export default function NavBar () {
  return  <nav className={styles.navBar}>
      <Link href="/" className={styles.items}><h1>Home</h1></Link>
      <Link href="/login" className={styles.items}><h1>Login</h1></Link>
      <Link href="/register" className={styles.items}><h1>Register</h1></Link>
    </nav>
}