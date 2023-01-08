import Utils from '@core/utils.js';
import { toast } from 'react-toastify';
import { CID } from '@app/shared/constants';


export function LoadAssetsList<T = any>(payload): Promise<T> {
    return new Promise((resolve, reject) => {
        Utils.invokeContract("action=view_all_assets,cid=" + CID, 
        (error, result, full) => {
            resolve(result.res);
        }, payload ? payload : null);
    });
}

export function CreateAsset<T = any>(metadata): Promise<T> {
    return new Promise((resolve, reject) => {
        Utils.invokeContract("action=create_token,metadata=" + metadata + ",cid="+CID, 
        (error, result, full) => {
            onMakeTx(error, result, full);
        });
    });
}

export function SendTo<T = any>(sendData, cid: string): Promise<T> {
    const { amount, address, fee, decimals } = sendData;
    const finalAmount = amount * Math.pow(10, decimals)
    const relayerFee = fee * Math.pow(10, decimals);

    return new Promise((resolve, reject) => {
        Utils.invokeContract("role=user,action=send,cid=" + cid + 
        ",amount=" + finalAmount + 
        ",receiver=" + address + 
        ",relayerFee=" + relayerFee, 
        (error, result, full) => {
            onMakeTx(error, result, full);
            resolve(result);
        });
    });
}

export function Receive<T = any>(tr): Promise<T> {
    return new Promise((resolve, reject) => {
        Utils.invokeContract("role=user,action=receive,cid=" + tr.cid + ",msgId=" + tr.id, 
        (error, result, full) => {
            onMakeTx(error, result, full);
            resolve(result);
        });
    });
}

export function LoadViewParams<T = any>(payload): Promise<T> {
    return new Promise((resolve, reject) => {
        Utils.invokeContract("role=user,action=view_params,cid="+CID, 
        (error, result, full) => {
            resolve(result.params);
        }, payload ? payload : null);
    });
}

export function UserDeposit<T = any>(amount: number, aid: number): Promise<T> {
    return new Promise((resolve, reject) => {
        Utils.invokeContract("role=user,action=deposit,amount="+ amount +",aid=" + aid + ",cid=" + CID, 
        (error, result, full) => {
            onMakeTx(error, result, full);
            resolve(result);
        });
    });
}

export function UserWithdraw<T = any>(amount: number, aid: number): Promise<T> {
    return new Promise((resolve, reject) => {
        Utils.invokeContract("action=view_token,aid=" + aid + ",cid=" + CID, 
        (error, result, full) => {
            console.log(result, full)
            //onMakeTx(error, result, full);
            resolve(result);
        });
    });
}

const onMakeTx = (err, sres, full, params: {id: number, vote: number} = null, toasted: string = null) => {
    if (err) {
        console.log(err, "Failed to generate transaction request")
    }

    Utils.callApi(
        'process_invoke_data', {data: full.result.raw_data}, 
        (error, result, full) => {
        }
    )
}