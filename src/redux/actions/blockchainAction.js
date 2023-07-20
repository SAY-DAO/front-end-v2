import { daoApi, publicApi } from '../../apis/sayBase';
import {
  FAMILY_NETWORK_REQUEST,
  FAMILY_NETWORK_SUCCESS,
  FAMILY_NETWORK_FAIL,
  SIGNATURE_REQUEST,
  SIGNATURE_FAIL,
  SIGNATURE_SUCCESS,
  WALLET_NONCE_REQUEST,
  WALLET_NONCE_SUCCESS,
  WALLET_NONCE_FAIL,
  WALLET_VERIFY_REQUEST,
  WALLET_VERIFY_SUCCESS,
  WALLET_VERIFY_FAIL,
  WALLET_INFORMATION_REQUEST,
  WALLET_INFORMATION_SUCCESS,
  WALLET_INFORMATION_FAIL,
  USER_SIGNATURES_REQUEST,
  USER_SIGNATURES_SUCCESS,
  USER_SIGNATURES_FAIL,
} from '../constants/daoConstants';

export const fetchNonce = () => async (dispatch, getState) => {
  try {
    dispatch({ type: WALLET_NONCE_REQUEST });
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
      crossDomain: true,
    };
    const response = await daoApi.get(`/wallet/nonce/${swInfo.id}/${swInfo.typeId}`, config);
    dispatch({
      type: WALLET_NONCE_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: WALLET_NONCE_FAIL,
      payload:
        e.response && e.response.data.detail ? e.response.data.detail : e.response.data.message,
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

export const fetchFamilyNetworks = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FAMILY_NETWORK_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo && userInfo.access_token,
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
      payload: e.response && (e.response.status ? e.response : e.response.data.message),
    });
  }
};

export const fetchUserSignatures = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_SIGNATURES_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo && userInfo.access_token,
      },
    };
    const { data } = await daoApi.get(`/wallet/signatures/${userInfo.id}`, config);

    dispatch({
      type: USER_SIGNATURES_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: USER_SIGNATURES_FAIL,
      payload: e.response && (e.response.status ? e.response : e.response.data.message),
    });
  }
};

export const signTransaction = (values, signer) => async (dispatch) => {
  try {
    dispatch({ type: SIGNATURE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const request = {
      flaskNeedId: values.flaskNeedId,
      signerAddress: values.address,
      statuses: values.statuses,
      receipts: values.receipts,
      payments: values.payments,
    };

    const result1 = await daoApi.post(`/wallet/signature/prepare`, request, config);
    const transaction = result1.data;
    console.log(transaction);
    // The named list of all type definitions
    const types = {
      ...transaction.types,
    };
    const signatureHash = await signer.signTypedData({
      domain: transaction.domain,
      types,
      primaryType: 'Voucher',
      message: {
        ...transaction.message,
      },
    });

    const request2 = {
      flaskNeedId: values.flaskNeedId,
      statuses: values.statuses,
      receipts: values.receipts,
      payments: values.payments,
      sayRole: transaction.sayRole,
    };
    const result2 = await daoApi.post(
      `/wallet/signature/create/${signatureHash}`,
      request2,
      config,
    );
    const { ipfs, signature } = result2.data;
    dispatch({
      type: SIGNATURE_SUCCESS,
      payload: { transaction, ipfs, signature },
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: SIGNATURE_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.response && e.response.data.message
          ? e.response.data.message
          : { reason: e.reason, code: e.code }, // metamask signature
    });
  }
};
