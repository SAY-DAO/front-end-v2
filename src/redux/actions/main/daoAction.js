import { readContract } from '@wagmi/core';
import { daoApi } from '../../../apis/sayBase';
import { FlaskUserTypesEnum, SAYPlatformRoles } from '../../../utils/types';
import {
  MY_READY_PAID_NEEDS_REQUEST,
  MY_PAID_NEEDS_SUCCESS,
  MY_PAID_NEEDS_FAIL,
  ONE_NEED_COLLECTIVE_RATIO_REQUEST,
  ONE_NEED_COLLECTIVE_RATIO_SUCCESS,
  ONE_NEED_COLLECTIVE_RATIO_FAIL,
  CONTRIBUTION_LIST_REQUEST,
  CONTRIBUTION_LIST_SUCCESS,
  CONTRIBUTION_LIST_FAIL,
  READY_TO_SIGN_ONE_NEED_REQUEST,
  READY_TO_SIGN_ONE_NEED_SUCCESS,
  READY_TO_SIGN_ONE_NEED_FAIL,
  SIGNATURE_PREPARE_REQUEST,
  SIGNATURE_PREPARE_SUCCESS,
  SIGNATURE_PREPARE_FAIL,
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
  ONE_NEED_PERSONAL_RATIO_REQUEST,
  ONE_NEED_PERSONAL_RATIO_SUCCESS,
  ONE_NEED_PERSONAL_RATIO_FAIL,
  SIGNATURE_VERIFICATION_REQUEST,
  SIGNATURE_VERIFICATION_SUCCESS,
  SIGNATURE_VERIFICATION_FAIL,
  SIGNATURE_HASH_REQUEST,
  SIGNATURE_HASH_SUCCESS,
  SIGNATURE_HASH_FAIL,
  SIGNATURE_CREATE_REQUEST,
  SIGNATURE_CREATE_SUCCESS,
  SIGNATURE_CREATE_FAIL,
} from '../../constants/daoConstants';
import {
  FAMILY_NETWORK_REQUEST,
  FAMILY_NETWORK_SUCCESS,
  FAMILY_NETWORK_FAIL,
} from '../../constants/familyConstants';
import VerifyVoucherContract from '../../../build/contracts/needModule/VerifyVoucher.sol/VerifyVoucher.json';
import network from '../../../build/contracts/network-settings.json';

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
        flaskId: userInfo && userInfo.user.id,
      },
      withCredentials: true,
      crossDomain: true,
    };
    const response = await daoApi.get(`/wallet/nonce/${FlaskUserTypesEnum.FAMILY}`, config);
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
        flaskId: userInfo && userInfo.user.id,
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
        flaskId: userInfo && userInfo.user.id,
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
        flaskId: userInfo && userInfo.user.id,
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
        flaskId: userInfo && userInfo.user.id,
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

export const fetchReadyPaidNeeds = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_READY_PAID_NEEDS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
        flaskId: userInfo && userInfo.user.id,
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
        flaskId: userInfo && userInfo.user.id,
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
        flaskId: userInfo && userInfo.user.id,
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

export const verifySocialWorkerSignature =
  (swSignatureHash, swAddress, flaskNeedId, chainId) => async (dispatch, getState) => {
    try {
      dispatch({ type: SIGNATURE_VERIFICATION_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: userInfo && userInfo.accessToken,
          flaskId: userInfo && userInfo.user.id,
        },
        withCredentials: true,
      };

      const request = {
        chainId,
        flaskNeedId,
      };

      const { data } = await daoApi.post(`/wallet/signature/verify`, request, config);

      const verifiedAddress = await readContract({
        address: network.mainnet.verifyVoucherAddress,
        abi: VerifyVoucherContract.abi,
        functionName: '_verify',
        args: [
          data.message.deliveryCode ? {
            needId: Number(data.message.needId),
            title: data.message.title,
            category: data.message.category,
            paid: Number(data.message.paid),
            deliveryCode: data.message.deliveryCode,
            child: data.message.child,
            signer: data.message.signer,
            swSignature: swSignatureHash, // social worker signature
            role: data.message.role,
            content: data.message.content,
          } :
            {
              needId: Number(data.message.needId),
              title: data.message.title,
              category: data.message.category,
              paid: Number(data.message.paid),
              child: data.message.child,
              signer: data.message.signer,
              swSignature: swSignatureHash, // social worker signature
              role: data.message.role,
              content: data.message.content,
            },

        ],
        blockTag: 'safe',
      });
   
      if (swAddress !== verifiedAddress) {
        dispatch({
          type: SIGNATURE_VERIFICATION_FAIL,
          payload: 'امضای مددکار مخدوش است!',
        });
        return;
      }
      dispatch({
        type: SIGNATURE_VERIFICATION_SUCCESS,
        payload: verifiedAddress,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: SIGNATURE_VERIFICATION_FAIL,
        payload:
          e.response && e.response.data.detail
            ? e.response.data.detail
            : e.response && e.response.data.message
              ? { message: e.response.data.message, status: e.response.data.status }
              : { reason: e.reason, code: e.code }, // metamask signature
      });
    }
  };

export const prepareSignature =
  (needId, address, chainId, ratios) => async (dispatch, getState) => {
    try {
      dispatch({ type: SIGNATURE_PREPARE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: userInfo && userInfo.accessToken,
          flaskId: userInfo && userInfo.user.id,
        },
        withCredentials: true,
      };

      const request = {
        needId,
        signerAddress: address,
        chainId,
        variables: ratios,
      };

      const result1 = await daoApi.post(`/wallet/signature/dapp/prepare`, request, config);
      const transaction = result1.data;
      // The named list of all type definitions
      const types = {
        ...transaction.types,
      };

      dispatch({
        type: SIGNATURE_PREPARE_SUCCESS,
        payload: {
          domain: transaction.domain,
          types,
          primaryType: 'Voucher',
          message: {
            ...transaction.message,
          },
        },
      });
    } catch (e) {
      dispatch({
        type: SIGNATURE_PREPARE_FAIL,
        payload:
          e.response && e.response.data.detail
            ? e.response.data.detail
            : e.response && e.response.data.message
              ? { message: e.response.data.message, status: e.response.data.status }
              : { reason: e.reason, code: e.code }, // metamask signature
      });
    }
  };

export const signTransaction = (signer, preparedData) => async (dispatch) => {
  try {
    dispatch({ type: SIGNATURE_HASH_REQUEST });

    const signatureHash = await signer.signTypedData({
      domain: preparedData.domain,
      types: preparedData.types,
      primaryType: 'Voucher',
      message: preparedData.message,
    });

    dispatch({
      type: SIGNATURE_HASH_SUCCESS,
      payload: signatureHash,
    });
  } catch (e) {
    dispatch({
      type: SIGNATURE_HASH_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.response && e.response.data.message
            ? { message: e.response.data.message, status: e.response.data.status }
            : { reason: e.reason, code: e.code }, // metamask signature
    });
  }
};

export const createSignature =
  (flaskNeedId, signatureHash, preparedData) => async (dispatch, getState) => {
    try {
      dispatch({ type: SIGNATURE_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: userInfo && userInfo.accessToken,
          flaskId: userInfo && userInfo.user.id,
        },
        withCredentials: true,
      };

      const request = {
        flaskNeedId,
        sayRoles: [SAYPlatformRoles.FAMILY],
        verifyVoucherAddress: preparedData.domain.verifyingContract,
      };

      const { data } = await daoApi.post(
        `/wallet/signature/create/${signatureHash}`,
        request,
        config,
      );

      dispatch({
        type: SIGNATURE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: SIGNATURE_CREATE_FAIL,
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

export const fetchPersonalRatios = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ONE_NEED_PERSONAL_RATIO_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
        flaskId: userInfo && userInfo.user.id,
      },
    };
    const { data } = await daoApi.get(`/family/distanceRatio`, config);

    dispatch({
      type: ONE_NEED_PERSONAL_RATIO_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: ONE_NEED_PERSONAL_RATIO_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.response && e.response.data.message,
    });
  }
};

export const fetchNeedCollectiveRatios = (needNestId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ONE_NEED_COLLECTIVE_RATIO_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
        flaskId: userInfo && userInfo.user.id,
      },
    };

    const { data } = await daoApi.get(`/family/user/coefficients/${needNestId}`, config);

    dispatch({
      type: ONE_NEED_COLLECTIVE_RATIO_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: ONE_NEED_COLLECTIVE_RATIO_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.response && e.response.data.message,
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
        flaskId: userInfo && userInfo.user.id,
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
