import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
    <Head>
      <title>WebZone | Home</title>
    </Head>
    <div className="home-container container">
      <div className={styles.banner}>
        <div className={styles.content}>
          <h1 className={styles.bannerRotation}>Explore</h1>
          <p className={styles.bannerHook}>At WebZone, we offer you a user friendly experience for free. <br></br>laborum  repudiandae voluptate Perspiciatis exercitationem.<br></br> enim rerum earum libero cupiditate mollitia amet nihil.</p>
        </div>
      </div>
    </div>
    </>
  )
}
