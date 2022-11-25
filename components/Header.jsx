import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <nav className="p-5 border-b-2 md:flex flex-row">
            <img src="/logo.png" alt="Img" className="h-10 w-10" />
            <h2 className="py-2 px-2 font-bold text-2xl"> Halal Crypto</h2>

            <div className="ml-auto py-2 px-4">
                <ConnectButton chainId={11235} moralisAuth={true} />
            </div>
        </nav>
    )
}
