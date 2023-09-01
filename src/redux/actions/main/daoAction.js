import { daoApi } from '../../../apis/sayBase';
import { SAYPlatformRoles } from '../../../utils/types';
import {
  MY_PAID_NEEDS_REQUEST,
  MY_PAID_NEEDS_SUCCESS,
  MY_PAID_NEEDS_FAIL,
  ONE_NEED_COEFFS_REQUEST,
  ONE_NEED_COEFFS_SUCCESS,
  ONE_NEED_COEFFS_FAIL,
  CONTRIBUTION_LIST_REQUEST,
  CONTRIBUTION_LIST_SUCCESS,
  CONTRIBUTION_LIST_FAIL,
  READY_TO_SIGN_ONE_NEED_REQUEST,
  READY_TO_SIGN_ONE_NEED_SUCCESS,
  READY_TO_SIGN_ONE_NEED_FAIL,
  SIGNATURE_REQUEST,
  SIGNATURE_SUCCESS,
  SIGNATURE_FAIL,
  WALLET_NONCE_REQUEST,
  WALLET_NONCE_SUCCESS,
  WALLET_NONCE_FAIL,
  WALLET_VERIFY_REQUEST,
  WALLET_VERIFY_SUCCESS,
  WALLET_VERIFY_FAIL,
  WALLET_INFORMATION_REQUEST,
  WALLET_INFORMATION_SUCCESS,
  WALLET_INFORMATION_FAIL,
  FAMILY_ECOSYSTEM_PAYS_REQUEST,
  FAMILY_ECOSYSTEM_PAYS_SUCCESS,
  FAMILY_ECOSYSTEM_PAYS_FAIL,
  ECOSYSTEM_MINT_REQUEST,
  ECOSYSTEM_MINT_SUCCESS,
  ECOSYSTEM_MINT_FAIL,
  FAMILY_DISTANCE_RATIO_REQUEST,
  FAMILY_DISTANCE_RATIO_SUCCESS,
  FAMILY_DISTANCE_RATIO_FAIL,
  SIGNATURE_VERIFICATION_REQUEST,
  SIGNATURE_VERIFICATION_SUCCESS,
  SIGNATURE_VERIFICATION_FAIL,
} from '../../constants/daoConstants';
import {
  FAMILY_NETWORK_REQUEST,
  FAMILY_NETWORK_SUCCESS,
  FAMILY_NETWORK_FAIL,
} from '../../constants/familyConstants';

export const fetchNonce = () => async (dispatch, getState) => {
  try {
    dispatch({ type: WALLET_NONCE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
        flaskId: 'me',
      },
      withCredentials: true,
      crossDomain: true,
    };
    const response = await daoApi.get(
      `/wallet/nonce/${userInfo.user.id}/${SAYPlatformRoles.FAMILY}`,
      config,
    );
    dispatch({
      type: WALLET_NONCE_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: WALLET_NONCE_FAIL,
      payload:
        e && e.response && e.response.data && e.response.data.detail
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
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
        flaskId: 'me',
      },
      withCredentials: true,
    };

    const { data } = await daoApi.post(
      `/wallet/verify/${userInfo.user.id}/${SAYPlatformRoles.FAMILY}`,
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

export const fetchWalletInformation = () => async (dispatch, getState) => {
  try {
    dispatch({ type: WALLET_INFORMATION_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
        flaskId: 'me',
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

export const fetchFamilyMemberDistanceRatio = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FAMILY_DISTANCE_RATIO_REQUEST });

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
    const { data } = await daoApi.get(`/family/distanceRatio`, config);

    dispatch({
      type: FAMILY_DISTANCE_RATIO_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: FAMILY_DISTANCE_RATIO_FAIL,
      payload: e.response && e.response.data ? e.response.data.message : e.message,
    });
  }
};

export const fetchEcoFamilyRolesCompletePays = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FAMILY_ECOSYSTEM_PAYS_REQUEST });

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
    const { data } = await daoApi.get(`/family/roles/ecosystem/payments`, config);

    dispatch({
      type: FAMILY_ECOSYSTEM_PAYS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: FAMILY_ECOSYSTEM_PAYS_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const fetchEcoMintData = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ECOSYSTEM_MINT_REQUEST });

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
    const { data } = await daoApi.get(`/mine/ecosystem/mineables`, config);

    dispatch({
      type: ECOSYSTEM_MINT_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: ECOSYSTEM_MINT_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const fetchPaidNeeds = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_PAID_NEEDS_REQUEST });

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

    const { data } = await daoApi.get(`/mine/needs/paid`, config);

    dispatch({
      type: MY_PAID_NEEDS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: MY_PAID_NEEDS_FAIL,
      payload: e.response && e.response.data ? e.response.data.message : e.message,
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

    const { data } = await daoApi.get(`/mine/signature/ready/${nestNeedId}`, config);

    dispatch({
      type: READY_TO_SIGN_ONE_NEED_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: READY_TO_SIGN_ONE_NEED_FAIL,
      payload: e.response && e.response.data ? e.response.data.message : e.message,
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
        flaskId: 'me',
      },
    };
    const { data } = await daoApi.get(`/children/network`, config);

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

export const signTransaction = (values, signer, chainId, settest) => async (dispatch, getState) => {
  try {
    dispatch({ type: SIGNATURE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
        flaskId: 'me',
      },
      withCredentials: true,
    };

    // 1- --------------------- First Prepare signature and get the hash -----------------------
    const request = {
      needId: values.needId,
      signerAddress: values.address,
      chainId,
    };

    const result1 = await daoApi.post(`/wallet/signature/dapp/prepare`, request, config);
    const transaction = result1.data;
    // The named list of all type definitions
    const types = {
      ...transaction.types,
    };
    let signatureHash;
    try {
      signatureHash = await signer.signTypedData({
        domain: transaction.domain,
        types,
        primaryType: 'Vouchedr',
        message: {
          ...transaction.message,
        },
      });
    } catch (e) {
      settest(e);
      throw new Error(e);
    }

    // 2- --------------------- Second Verify social worker signature -----------------------
    const request2 = {
      chainId,
      flaskNeedId: values.flaskNeedId,
      signerAddress: signer,
    };

    dispatch({
      type: SIGNATURE_VERIFICATION_REQUEST,
    });

    const verifiedAddress = await daoApi.post(`/wallet/signature/verify`, request2, config);

    dispatch({
      type: SIGNATURE_VERIFICATION_SUCCESS,
      payload: verifiedAddress,
    });

    const request3 = {
      flaskNeedId: values.flaskNeedId,
      sayRoles: transaction.sayRoles,
      verifyVoucherAddress: transaction.domain.verifyingContract,
    };

    const result3 = await daoApi.post(
      `/wallet/signature/create/${signatureHash}`,
      request3,
      config,
    );
    const { ipfs, signature } = result3.data;
    dispatch({
      type: SIGNATURE_SUCCESS,
      payload: { transaction, ipfs, signature },
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: SIGNATURE_VERIFICATION_FAIL,
    });
    dispatch({
      type: SIGNATURE_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.response && e.response.data.message
          ? { message: e.response.data.message, status: e.response.data.status }
          : { reason: e.reason, code: e.code }, // metamask signature
    });
  }
};

// export const safeFamilyMint = (voucher) => async (dispatch) => {
//   try {
//     dispatch({ type: MINT_REQUEST });
//     // await dispatch(connectWallet()); // connect wallet to get the address

//     // eslint-disable-next-line no-undef
//     await window.ethereum.enable();
//     // eslint-disable-next-line no-undef
//     // const provider = new ethers.providers.Web3Provider(window.ethereum);
//     // const redeemer = provider.getSigner();

//     // Returns a new instance of the ContractFactory with the same interface and bytecode, but with a different signer.
//     // const redeemerFactory = signerFactory.connect(redeemer);
//     // const redeemerFactory = new ethers.ContractFactory(
//     //   GovernanceToken.abi,
//     //   GovernanceToken.bytecode,
//     //   redeemer,
//     // );

//     // Return an instance of a Contract attached to address. This is the same as using the Contract constructor
//     // with address and this the interface and signerOrProvider passed in when creating the ContractFactory.
//     // const redeemerContract = redeemerFactory.attach('0x004a0304523554961578f2b7050BDFdE57625228');

//     const theVoucher = {
//       needId: voucher.needId,
//       userId: voucher.userId,
//       needTitle: voucher.needTitle,
//       needImage: voucher.needImage,
//       content: voucher.content,
//       signature: voucher.signature,
//     };

//     console.log(voucher.needId, '0x004a0304523554961578f2b7050BDFdE57625228', theVoucher);

//     // await redeemerContract.safeFamilyMint(
//     //   voucher.needId,
//     //   '0x004a0304523554961578f2b7050BDFdE57625228',
//     //   theVoucher,
//     // );

//     dispatch({
//       type: MINT_SUCCESS,
//       payload: voucher,
//     });
//   } catch (e) {
//     console.log('problem buying: ');
//     console.log({ e });
//     dispatch({
//       type: MINT_FAIL,
//       payload: e.response && e.response.data.detail ? e.response.data.detail : e.message,
//     });
//   }
// };

export const fetchNeedCoefficients = (needNestId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ONE_NEED_COEFFS_REQUEST });

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

    const { data } = await daoApi.get(`/needs/coefficients/${needNestId}`, config);

    dispatch({
      type: ONE_NEED_COEFFS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: ONE_NEED_COEFFS_FAIL,
      payload: e.response && e.response.data ? e.response.data.message : e.message,
    });
  }
};

export const fetchAvailableContribution = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CONTRIBUTION_LIST_REQUEST });

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

    const { data } = await daoApi.get(`/contribution/all`, config);

    dispatch({
      type: CONTRIBUTION_LIST_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: CONTRIBUTION_LIST_FAIL,
      payload: e.response && e.response.data ? e.response.data.message : e.message,
    });
  }
};
