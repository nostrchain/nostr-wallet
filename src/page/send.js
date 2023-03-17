import React,{ useState ,useRef, useEffect}  from 'react';
import {nip19, generatePrivateKey, getPublicKey} from 'nostr-tools'
import {useNavigate,useParams } from 'react-router-dom'
import { Input,Button, Space,message ,Card,Typography } from 'antd';
// import {privateKeyToWeb3Key,privateKeyToWeb3Address,publicKeyToBytes,getBankBalance,withdrawalToWallet,npubBindAddress,transferToNpub} from 'nostr-web3js'
import {privateKeyToWeb3Key,privateKeyToWeb3Address,publicKeyToBytes,getBankBalance,withdrawalToWallet,npubBindAddress,transferToNpub,transferToAddress} from 'nostr-web3js'


import '../App.css';

const { TextArea } = Input;
const { Link } = Typography;

const SendPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const params = useParams();
    let meKey = localStorage.getItem('pkey');
    let npub = nip19.npubEncode( getPublicKey(privateKeyToWeb3Key(meKey)) );

    //const npub = params.npub;

    const [balance, setBalance] = useState(0.0);
    const [topub, setTopub] = useState("");
    const [tonum, setTonum] = useState(5);
    const [txurl, setTxurl] = useState("");


    const refreshBalance = () => {
        console.log("refreshBalance ...")
        getBankBalance(npub).then(([allBalance,bankBalance,walletBalance,addr]) =>{
            console.log("getBankBalance ok",allBalance,bankBalance,walletBalance,addr);
            setBalance(allBalance)
        }).catch((err) =>{
            console.log("getBankBalance fail",err);
        })
    }


    let useCount = 0;
    useEffect(() => {
        if (useCount == 1){
            console.log(`useEffect Component mounted`)
            refreshBalance();
        }
        useCount++;
    }, [])


    const giveMe100 = async () => {
        // This function is only used for testing
        
        let FaucetKey = "nsec1jjv63e3sjmp4847cy7dvgtvzrqtuahg7cpp7v5txnska7fw0kzdqu0tjwg";

        console.log(`giveMe100 meKey=`,meKey)

        let meAddr = privateKeyToWeb3Address(meKey);

        console.log(`giveMe100 `,meAddr)

        // transferToAddress(FaucetKey,meAddr,100).then((hash) =>{
        //     console.log("transferToAddress ok",hash);
        //     setTxurl(hash);

        //     npubBindAddress(meKey).then((btx) =>{
        //         console.log("npubBindAddress ok",btx);
        //         refreshBalance();

        //     }).catch((err) =>{
        //         console.log("npubBindAddress fail",err);


        //     })

        // }).catch((err) =>{
        //     console.log("transferToAddress fail",err);
        // })


        let thash = await transferToAddress(FaucetKey,meAddr,100);
        console.log("thash",thash)
        let bhash = await npubBindAddress(meKey);
        console.log("bhash",bhash)
        refreshBalance();







    }



    return( 

        <div className="Main-Body">
                        
            <Card title="Nostr Wallet"  className="Main-Card"  bordered={false} >
            {contextHolder}
            <p>PullicKey: {npub}</p>
            <p>balance: {balance} NOC</p>
            <p>
            <Space size='large'>
                    <Button type="primary" onClick={giveMe100} >Give me 100 NOC </Button>
                    {/* <Button type="primary" onClick={onClickNext} >Next</Button> */}

            </Space>
            </p>
            <Input className='npubEdit' addonBefore="To" defaultValue="" 
                    placeholder="Your friend's npub1n55yejhcgy95gc04zd4snmds2qx4p9mpkxzxas6g3uj" style={{width:"100%"}}
                    onChange={  (event) =>{ setTopub(event.target.value); } }    
                />
        

            <p>     <Input addonBefore="Fund" suffix="NOC" defaultValue="5" 
                    placeholder="" 
                    onChange={  (event) =>{ setTonum(event.target.value); } }   
                />   
             </p>


            <p>
            <Space size='large'>
            <Button type="primary" onClick={async event => {
                                            try{
                                                let {type, data} = nip19.decode(topub)
                                                console.log("Send ",type, data); 
                                                
                                                transferToNpub(localStorage.getItem('pkey'),topub,String(tonum)).then((transactionHash) =>{  
                                                    console.log("Send ok transactionHash=",transactionHash);
                                                    messageApi.open({
                                                        type: 'success',
                                                        content: 'Send success!',
                                                    });
                                                    setTxurl(transactionHash);
                                                    refreshBalance();

                                                }).catch((err) =>{
                                                    console.log("Send fail",err);
                                                    messageApi.open({
                                                        type: 'error',
                                                        content: 'Send fail!',
                                                    });


                                                })

                                            }catch(err){
                                                messageApi.open({
                                                    type: 'error',
                                                    content: 'npub key is error!',
                                                });
                                            }

                                            }}
                    >Send</Button>

            {/* <p> {localStorage.getItem('pkey')} </p> */}
            </Space>

            </p>

            <p>     
                <Link href={ "https://testnet.nostrchain.xyz/tx/"+txurl} target="_blank">
                Blockchain explorer : {txurl}
                </Link>
            </p>
            <p>     
                <Link href={ "/info/"+String(topub)} target="_blank">
                show info : {String(topub)}
                </Link>
            </p>

            </Card>


        </div>

    );
}
export default SendPage

