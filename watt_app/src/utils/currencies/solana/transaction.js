import * as web3 from "@solana/web3.js";
import { solGetAccount } from "./wallet";
import { walletsGetConnectionSolana } from "../../../common/Wallets";

const LAMPORTS_PER_SOL = web3.LAMPORTS_PER_SOL;

const publicKeyFromString = (publicKeyString: string) => {
  return new web3.PublicKey(publicKeyString);
};

const solSignTxMnemonic = async (props) => {
  const {
    mnemonic,
    transaction: tx
  } = props;

  const {
    sender: senderAddress,
    recipient: recipientAddress,
    amount
  } = tx;

  const { account } = solGetAccount(mnemonic);

  const connection = walletsGetConnectionSolana();

  const recentBlockhash = await (connection.getRecentBlockhash('confirmed'))?.blockhash || '';
  const fromPubkey = publicKeyFromString(senderAddress);
  const toPubkey = publicKeyFromString(recipientAddress);

  const transaction = new web3.Transaction({
    feePayer: fromPubkey,
    recentBlockhash: recentBlockhash
  }).add(
    web3.SystemProgram.transfer({
      fromPubkey: fromPubkey,
      toPubkey: toPubkey,
      lamports: +amount * LAMPORTS_PER_SOL,
    })
  );

  const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [account]
  ).catch((err) => {
    return {
      error: {
        message: err?.message || 'Failed to send transaction'
      }
    }
  });

  return signature;
};

export {
  solSignTxMnemonic,
};
