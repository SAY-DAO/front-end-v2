import { daoApi, publicApi } from '../../../apis/sayBase';
import { SAY_DAPP_ID } from '../../../utils/configs';
import {
  READY_TO_SIGN_NEEDS_REQUEST,
  READY_TO_SIGN_NEEDS_SUCCESS,
  READY_TO_SIGN_NEEDS_FAIL,
  READY_TO_SIGN_ONE_NEED_REQUEST,
  READY_TO_SIGN_ONE_NEED_SUCCESS,
  READY_TO_SIGN_ONE_NEED_FAIL,
  SIGNATURE_REQUEST,
  SIGNATURE_SUCCESS,
  SIGNATURE_FAIL,
  MINT_REQUEST,
  MINT_SUCCESS,
  MINT_FAIL,
  WALLET_NONCE_REQUEST,
  WALLET_NONCE_SUCCESS,
  WALLET_NONCE_FAIL,
  WALLET_VERIFY_REQUEST,
  WALLET_VERIFY_SUCCESS,
  WALLET_VERIFY_FAIL,
  WALLET_INFORMATION_REQUEST,
  WALLET_INFORMATION_SUCCESS,
  WALLET_INFORMATION_FAIL,
} from '../../constants/daoConstants';
import {
  FAMILY_NETWORK_REQUEST,
  FAMILY_NETWORK_SUCCESS,
  FAMILY_NETWORK_FAIL,
  FAMILY_ANALYTIC_REQUEST,
  FAMILY_ANALYTIC_SUCCESS,
  FAMILY_ANALYTIC_FAIL,
} from '../../constants/familyConstants';

const tempId = SAY_DAPP_ID;

export const fetchNonce = () => async (dispatch, getState) => {
  try {
    dispatch({ type: WALLET_NONCE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo && userInfo.access_token,
      },
      withCredentials: true,
      crossDomain: true,
    };
    const response = await daoApi.get(`/wallet/nonce/${userInfo.user.id}`, config);
    dispatch({
      type: WALLET_NONCE_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: WALLET_NONCE_FAIL,
      payload:
        e.response && e.response.data && e.response.data.detail
          ? e.response.data.detail
          : e.response.data.message,
    });
  }
};

export const walletVerify = (message, signature) => async (dispatch, getState) => {
  try {
    dispatch({ type: WALLET_VERIFY_REQUEST });

    const {
      userLogin: { userInfo },
      swDetails: { swInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo && userInfo.access_token,
      },
      withCredentials: true,
    };

    const { data } = await daoApi.post(
      `/wallet/verify/${swInfo.id}/${swInfo.typeId}`,
      {
        message,
        signature,
      },
      config,
    );

    dispatch({
      type: WALLET_VERIFY_SUCCESS,
      payload: data,
    });
  } catch (e) {
    console.log('here');
    console.log(e.response.statusText);
    dispatch({
      type: WALLET_VERIFY_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.response && e.response.data.message
          ? e.response.data.message
          : e.response && e.response.statusText
          ? e.response.statusText
          : { reason: e.reason, code: e.code }, // metamask signature
    });
  }
};

export const fetchWalletInformation = () => async (dispatch) => {
  try {
    dispatch({ type: WALLET_INFORMATION_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    const { data } = await daoApi.get(`/wallet/personal_information`, config);

    dispatch({
      type: WALLET_INFORMATION_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: WALLET_INFORMATION_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.response && e.response.data.message
          ? e.response.data.message
          : { reason: e.reason, code: e.code }, // metamask signature
    });
  }
};
export const fetchFamilyMemberAnalytic = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FAMILY_ANALYTIC_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
        flaskId: 'me',
      },
    };
    const { data } = await daoApi.get(`/family/payments/${tempId}`, config);
    // const { data } = await daoApi.get(`/analytic/family/${userInfo.user.id}`, config);

    dispatch({
      type: FAMILY_ANALYTIC_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: FAMILY_ANALYTIC_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const fetchReadySignNeeds = () => async (dispatch, getState) => {
  try {
    dispatch({ type: READY_TO_SIGN_NEEDS_REQUEST });

    const {
      userLogin: { userInfo },
      // userDetails: { theUser },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
        flaskId: 'me',
      },
    };

    const { data } = await daoApi.get(`/family/signatures/ready/${tempId}`, config);
    // const { data } = await daoApi.get(
    //   `/wallet/family/signatures/ready/${userInfo.user.id}`,
    //   config,
    // );

    dispatch({
      type: READY_TO_SIGN_NEEDS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: READY_TO_SIGN_NEEDS_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const fetchOneReadySignNeed = (nestNeedId) => async (dispatch, getState) => {
  try {
    dispatch({ type: READY_TO_SIGN_ONE_NEED_REQUEST });

    const {
      userLogin: { userInfo },
      // userDetails: { theUser },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
        flaskId: 'me',
      },
    };

    const { data } = await daoApi.get(`/family/signature/ready/${nestNeedId}`, config);
    // const { data } = await daoApi.get(
    //   `/wallet/family/signatures/ready/${userInfo.user.id}`,
    //   config,
    // );

    dispatch({
      type: READY_TO_SIGN_ONE_NEED_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: READY_TO_SIGN_ONE_NEED_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const fetchFamilyNetworks = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FAMILY_NETWORK_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
      },
    };
    const { data } = await publicApi.get(`/public/children`, config);

    dispatch({
      type: FAMILY_NETWORK_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: FAMILY_NETWORK_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const signTransaction = (need, swSignature) => async (dispatch, getState) => {
  try {
    dispatch({ type: SIGNATURE_REQUEST });
    const {
      userLogin: { userInfo },
      wallet: { signerAddress, chainId },
    } = getState();

    const found = need.verifiedPayments.find((p) => p.flaskUserId === userInfo.user.id);
    if (!found) {
      throw new Error('You did not pay for this need!');
    }
    if (!need.IsDone) {
      throw new Error('Need is not fully paid!');
    }

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const requestData = {
      chainId,
      signerAddress,
      need: {
        needID: need.id,
        title: need.name,
        isUrgent: need.isUrgent,
        icon: need.imageUrl,
      },
      swSignature,
      // userId,
    };

    const { data } = await daoApi.post(`/signature/vf/generate`, config, requestData);

    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const signature = await signer._signTypedData(
    //   data.domain,
    //   data.types,
    //   data.FamilyVoucher
    // );

    dispatch({
      type: SIGNATURE_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: SIGNATURE_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const safeFamilyMint = (voucher) => async (dispatch) => {
  try {
    dispatch({ type: MINT_REQUEST });
    // await dispatch(connectWallet()); // connect wallet to get the address

    // eslint-disable-next-line no-undef
    await window.ethereum.enable();
    // eslint-disable-next-line no-undef
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const redeemer = provider.getSigner();

    // Returns a new instance of the ContractFactory with the same interface and bytecode, but with a different signer.
    // const redeemerFactory = signerFactory.connect(redeemer);
    // const redeemerFactory = new ethers.ContractFactory(
    //   GovernanceToken.abi,
    //   GovernanceToken.bytecode,
    //   redeemer,
    // );

    // Return an instance of a Contract attached to address. This is the same as using the Contract constructor
    // with address and this the interface and signerOrProvider passed in when creating the ContractFactory.
    // const redeemerContract = redeemerFactory.attach('0x004a0304523554961578f2b7050BDFdE57625228');

    const theVoucher = {
      needId: voucher.needId,
      userId: voucher.userId,
      needTitle: voucher.needTitle,
      needImage: voucher.needImage,
      content: voucher.content,
      signature: voucher.signature,
    };

    console.log(voucher.needId, '0x004a0304523554961578f2b7050BDFdE57625228', theVoucher);

    // await redeemerContract.safeFamilyMint(
    //   voucher.needId,
    //   '0x004a0304523554961578f2b7050BDFdE57625228',
    //   theVoucher,
    // );

    dispatch({
      type: MINT_SUCCESS,
      payload: voucher,
    });
  } catch (e) {
    console.log('problem buying: ');
    console.log({ e });
    dispatch({
      type: MINT_FAIL,
      payload: e.response && e.response.data.detail ? e.response.data.detail : e.message,
    });
  }
};
