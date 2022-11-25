import Head from "next/head"
import styles from "../styles/Home.module.css"
import Header from "../components/Header"
import MintingComponent from "../components/Minting"
import { useMoralis } from "react-moralis"

const supportedChains = ["11235"]

export default function Home() {
    const { isWeb3Enabled, chainId } = useMoralis()

    return (
        <div className={styles.container}>
            <Head>
                <title>Halal Crypto Community</title>
                <meta name="description" content="Shariah complient community for crypto" />
                <link rel="icon" href="/logo.png" />
            </Head>
            <Header />
            {isWeb3Enabled ? (
                <div>
                    {supportedChains.includes(parseInt(chainId).toString()) ? (
                        <div className="flex flex-row">
                            <MintingComponent className="p-8" />
                        </div>
                    ) : (
                        <div className="font-bold text-3xl text-center pt-20">
                            Please switch to Haqq Network
                        </div>
                    )}
                </div>
            ) : (
                <div className="font-bold text-3xl text-center pt-20">
                    Please connect to a Wallet
                </div>
            )}
        </div>
    )
}
