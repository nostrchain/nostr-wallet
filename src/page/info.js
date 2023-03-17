import React,{ useState ,useRef, useEffect}  from 'react';
import {nip19, generatePrivateKey, getPublicKey} from 'nostr-tools'
import {useNavigate,useParams } from 'react-router-dom'
import { Input,Button, Space,message ,Card,Typography } from 'antd';
// import {privateKeyToWeb3Key,privateKeyToWeb3Address,publicKeyToBytes,getBankBalance,withdrawalToWallet,npubBindAddress,transferToNpub} from 'nostr-web3js'
import {privateKeyToWeb3Key,privateKeyToWeb3Address,publicKeyToBytes,getBankBalance,withdrawalToWallet,npubBindAddress,transferToNpub,transferToAddress} from 'nostr-web3js'


import '../App.css';

const { TextArea } = Input;
const { Link } = Typography;

const InfoPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const params = useParams();

    const npub = params.npub;

    const [balance, setBalance] = useState('...');
    const [bankBalance, setBankBalance] = useState('...');
    const [addr, setAddr]  = useState("");


    const refreshBalance = () => {
        getBankBalance(npub).then(([allBalance,bankBalance,walletBalance,addr]) =>{
            console.log("getBankBalance ok",allBalance,bankBalance,walletBalance,addr);
            setBalance(allBalance)
            setBankBalance(bankBalance)
            setAddr(addr)
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





    return( 

        <div className="Main-Body">
                        
            <Card title="Nostr Wallet (Info)"  className="Main-Card"  bordered={false} >
            {contextHolder}
            <p>PullicKey: {npub}</p>
            <p>balance: {balance} NOC</p>
            <p>bank: {bankBalance} NOC</p>
            <p>web3 wallet address: {addr} </p>


            </Card>


        </div>

    );
}
export default InfoPage

