import Link from "next/link";
import React from "react";
import styles from "../(main)/page.module.css";

function AuthLinks() {
  return (
    <>
      <Link href="/register" className={`btn text-white ${styles.registerBtn}`}>
        Register
      </Link>
      <Link href="/login" className={`btn text-white ${styles.loginBtn}`}>
        Login
      </Link>
    </>
  );
}

export default AuthLinks;
