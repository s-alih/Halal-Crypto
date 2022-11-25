import { contractAddresses, abi } from "../constants"
// dont export from moralis when using react
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"

export default function MintingComponent() {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex, user, account } = useMoralis()
    // These get re-rendered every time due to our connect button!
    const chainId = parseInt(chainIdHex)
    // console.log(`ChainId is ${chainId}`)
    const hccAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    // State hooks
    // https://stackoverflow.com/questions/58252454/react-hooks-using-usestate-vs-just-variables

    const [address, setAddress] = useState()
    const [balance, setBalance] = useState([])
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false)

    function increment() {
        setCount(function (prevCount) {
            return (prevCount += 1)
        })
    }

    function decrement() {
        setCount(function (prevCount) {
            if (prevCount > 0) {
                return (prevCount -= 1)
            } else {
                return (prevCount = 0)
            }
        })
    }

    const dispatch = useNotification()
    /* View Functions */
    const {
        runContractFunction: Mint,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,

        contractAddress: hccAddress, // specify the networkId
        functionName: "deposit",
        msgValue: (count * 10 ** 18).toString(),
    })

    const { runContractFunction: BalanceOf } = useWeb3Contract({
        abi: abi,
        contractAddress: hccAddress, // specify the networkId
        functionName: "balanceOf",
        params: {
            "": account.toString(),
        },
    })

    async function updateUIValues() {
        const newBalance = (await BalanceOf()).toString()
        setBalance(newBalance / 10 ** 18)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
    }

    const handleErrorNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction failed!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
            iconColor: "red",
        })
    }
    const handleError = () => {
        try {
            setCount(0)
            handleErrorNotification()
        } catch (error) {
            console.log(error)
        }
    }
    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1)
            setCount(0)
            updateUIValues()
            handleNewNotification(tx)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="container mt-0 mx-auto px-2 ">
            <div className="md:flex lg:items-center ">
                <div className="flex-1 text-start  m-2 rounded ">
                    <div className="lg:flex  ">
                        <div className="mt-4 lg:mt-0 lg:ml-0 lg:pb-3 ">
                            <div className=" tracking-wide text-4xl  font-extrabold  ">
                                Halal Crypto Community
                            </div>
                            <div
                                href="#"
                                className=" mt-1 my-2 text-lg flex leading-tight font-normal"
                            >
                                Halal Crypto Community empowering an ethics-first Shariah <br />
                                -compliant financial crypto ecosystem{" "}
                            </div>
                        </div>
                    </div>
                    <div className="lg:flex lg:items-center my-2 lg:pb-8">
                        <div className="lg:flex-shrink-0">
                            <img className="rounded-lg  h-10 w-10" src="/lock.png" alt="pic" />
                        </div>
                        <div className="mt-4 lg:mt-0 lg:ml-6">
                            <div className=" tracking-wide text-xl  font-extrabold ">
                                Mint HCC by Locking ISLM
                            </div>
                            <div href="#" className="block mt-1 text-sm leading-tight font-normal">
                                Connect with MetaMask and make sure you have ISLM token <br /> that
                                is greater than HCC token you want to mint
                            </div>
                        </div>
                    </div>
                    <div className="lg:flex lg:items-center my-2 lg:pb-8">
                        <div className="lg:flex-shrink-0">
                            <img className="rounded-lg  h-10 w-10 " src="/burn.png" alt="pic" />
                        </div>
                        <div className="mt-4 lg:mt-0 lg:ml-6">
                            <div className=" tracking-wide text-xl  font-extrabold ">
                                Burn HCC to return ISLM{" "}
                            </div>
                            <div href="#" className="block mt-1 text-xs leading-tight font-normal">
                                Make sure that your wallet contains enough HCC token that is <br />{" "}
                                always greater or equal to desired ISLM in return
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex text-center mt-20   bg-gradient-to-r from-green-600 to-green-900 p-6  rounded-lg">
                    <div className=" text-white  bg-black m-3 rounded-lg p-10 center  ">
                        <div className=" flex place-content-center">
                            <div>
                                <img src="/logo.png" className="pb-6" alt="" />
                            </div>
                        </div>

                        <div className=" tracking-wide text-xl  font-bold ">Mint Your HCC</div>
                        <div className=" tracking-wide text-xs  px-12 font-light ">
                            Collect you HCC token by locking <br /> ISLM token{" "}
                        </div>

                        <div className=" tracking-wide text-xs py-6  font-normal ">
                            {balance} token already minted
                        </div>
                        <div className="flex place-content-center lg:items-center py-6">
                            <div className="flex-shrink-0">Amount:</div>
                            <div className="flex ml-7  bg-green-900 px-4 py-3 rounded-lg ">
                                <div href="#" className="flex   text-base leading-tight font-bold">
                                    <button className="pr-6 " onClick={decrement}>
                                        -
                                    </button>
                                    <div className="border-x-neutral-50"></div>
                                    <h1>{count}</h1>

                                    <button className="pl-6" onClick={increment}>
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex lg:items-center place-content-center pb-15">
                            <div className="flex-shrink-0">
                                <div>Total:</div>
                            </div>
                            <div className="px-5">{count} ISLM</div>
                        </div>

                        <button
                            className="flex-1 text-center  bg-yellow-600  px-20 py-3  my-4 rounded-lg hover"
                            onClick={async () => {
                                setLoading(true)
                                await Mint({
                                    // onComplete:
                                    // onError:
                                    onSuccess: handleSuccess,

                                    onError: handleError,
                                })
                                setLoading(false)
                            }}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                            ) : (
                                "Mint"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
