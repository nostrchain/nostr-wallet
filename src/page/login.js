import React,{ useState ,useRef, useEffect}  from 'react';
import {nip19, generatePrivateKey, getPublicKey} from 'nostr-tools'
import {useNavigate } from 'react-router-dom'
import {privateKeyToWeb3Key,privateKeyToWeb3Address,publicKeyToBytes} from 'nostr-web3js'
import '../App.css';
import logo from '../logo.svg';
//import './page.css';

import { Input,Button, Space,message,Card } from 'antd';
const { TextArea } = Input;

export default function PrivateImputPage(){
    const [messageApi, contextHolder] = message.useMessage();
    //const history = useHistory();
    const [privateKey, setPrivateKey] = useState("");

    const navigate  = useNavigate();

    const onClickGeneratedKey = (event) =>{
        let sk = generatePrivateKey()
        let nsec = nip19.nsecEncode(sk)
        setPrivateKey(nsec);
    }

    const textChange = (event) =>{
        setPrivateKey(event.target.value);
    }

    // const onClickNext = (event) =>{
    //     console.log("onClickNext ",  "privateKey=",privateKey);
    //     try{
    //         let {type, data} = nip19.decode(privateKey)
    //         console.log("onClickNext ",type, data); 
    //         localStorage.setItem('pkey', privateKey);
    //         let npub = getPublicKey(privateKeyToWeb3Key(privateKey));
    //         console.log('npub=',npub);

    //         navigate('/send/${npub}')

    //     }catch(err){
    //         messageApi.open({
    //             type: 'error',
    //             content: 'private key is error!',
    //           });
    //     }
    // }

    return(


        <div className="Main-Body">
                    
            <Card title="Nostr Wallet" className="Main-Card" bordered={false} >
                {contextHolder}
                <p>Nostr blockchain wallet, input or randomly generated private key, can transfer assets in the blockchain network. ( This page is a test network demo )</p>
                <p><TextArea rows={2} value={privateKey}  onChange={textChange}  placeholder="nsec1ntcc37vuxnc6p73fr363lsuz4fu0jc84mawmxlvyjzw9y7htfllqx2nqgm" /></p>
                <p>
                    <Space size='large'>
                    
                    {/* <Button type="primary" onClick={onClickNext} >Next</Button> */}
                    <Button type="primary" onClick={async event => {
                                            try{
                                                let {type, data} = nip19.decode(privateKey)
                                                console.log("onClickNext ",type, data); 
                                                localStorage.setItem('pkey', privateKey);
                                                let npub = nip19.npubEncode( getPublicKey(privateKeyToWeb3Key(privateKey)) );
                                                console.log('npub=',npub);
                                                navigate(`/send`)


                                            }catch(err){
                                                messageApi.open({
                                                    type: 'error',
                                                    content: 'private key is error!',
                                                });
                                            }

                                            }}
                    >Next</Button>

                    <Button type="primary" onClick={onClickGeneratedKey}>Generated Private Key</Button> 
                    </Space>


                </p>

            </Card>

        </div>




    )
}


//export default LoginPage;