import { ethers } from 'ethers';
import { daoApi, publicApi } from '../../../apis/sayBase';
import {
  FAMILY_NETWORK_REQUEST,
  FAMILY_NETWORK_SUCCESS,
  FAMILY_NETWORK_FAIL,
  SIGNATURE_REQUEST,
  SIGNATURE_SUCCESS,
  SIGNATURE_FAIL,
  MINT_REQUEST,
  MINT_SUCCESS,
  MINT_FAIL,
  WALLET_CONNECT_REQUEST,
  WALLET_CONNECT_SUCCESS,
  WALLET_CONNECT_FAIL,
  UPDATE_FLASK_REQUEST,
  UPDATE_SERVER_SUCCESS,
  UPDATE_SERVER_FAIL,
} from '../../constants/daoConstants';
import Signature from '../../../Signature';
import VerifyVoucher from '../../../build/contracts/tokens/ERC721/VerifyVoucher.sol/VerifyVoucher.json';
import GovernanceToken from '../../../build/contracts/tokens/ERC721/GovernanceToken.sol/GovernanceToken.json';

export const updateNestServer = (childId) => async (dispatch, getState) => {
  let need = {};
  const needList = [];
  try {
    dispatch({ type: UPDATE_FLASK_REQUEST });
    const {
      userLogin: { userInfo },
      userDetails: { theUser },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
      },
    };
    const { data } = await publicApi.get(
      `/child/${childId}/needs/summary`,
      config
    );

    for (let i = 0; i < data.needs.length; i += 1) {
      need = {
        needId: data.needs[i].id,
        title: data.needs[i].name,
        category: data.needs[i].category,
        created: data.needs[i].created,
        doneAt: data.needs[i].doneAt,
        imageUrl: data.needs[i].imageUrl,
        isDone: data.needs[i].isDone,
        isUrgent: data.needs[i].isUrgent,
        participants: data.needs[i].participants,
        progress: data.needs[i].progress,
        type: data.needs[i].type,
        unpayable: data.needs[i].unpayable,
        cost: data.needs[i].cost,
      };
      needList.push(need);
    }

    const needRequest = {
      totalCount: needList.length,
      needData: needList,
      childId,
    };
    console.log(needRequest);

    await daoApi.post(`/sync/update`, needRequest);

    const nestResponse2 = await daoApi.get(
      `users/done?userId=${theUser.id}&childId=${childId}`
    );

    dispatch({
      type: UPDATE_SERVER_SUCCESS,
      payload: nestResponse2.data,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_SERVER_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.message,
    });
  }
};

export const connectWallet = () => async (dispatch) => {
  try {
    dispatch({ type: WALLET_CONNECT_REQUEST });

    // eslint-disable-next-line no-undef
    await window.ethereum.enable();
    // eslint-disable-next-line no-undef
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    const walletAddress = await signer.getAddress();

    dispatch({
      type: WALLET_CONNECT_SUCCESS,
      payload: walletAddress,
    });
  } catch (e) {
    dispatch({
      type: WALLET_CONNECT_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.message,
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

export const signTransaction = (needId, userId) => async (dispatch) => {
  try {
    dispatch({ type: SIGNATURE_REQUEST });

    await window.ethereum.enable();
    // eslint-disable-next-line no-undef
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
      request: {
        verifyContractAddress: '0x004a0304523554961578f2b7050BDFdE57625228',
        chainId: 1,
        signerAddress,
        needId,
        userId,
        impacts: 5,
      },
    };

    const { data } = await daoApi.post(`/signature/add`, config);
    // eslint-disable-next-line no-underscore-dangle
    const signature = await signer._signTypedData(
      data.domain,
      data.types,
      data.FamilyVoucher
    );

    dispatch({
      type: SIGNATURE_SUCCESS,
      payload: { data, signature },
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
    await dispatch(connectWallet()); // connect wallet to get the address

    // eslint-disable-next-line no-undef
    await window.ethereum.enable();
    // eslint-disable-next-line no-undef
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const redeemer = provider.getSigner();

    // Returns a new instance of the ContractFactory with the same interface and bytecode, but with a different signer.
    // const redeemerFactory = signerFactory.connect(redeemer);
    const redeemerFactory = new ethers.ContractFactory(
      GovernanceToken.abi,
      GovernanceToken.bytecode,
      redeemer
    );

    // Return an instance of a Contract attached to address. This is the same as using the Contract constructor
    // with address and this the interface and signerOrProvider passed in when creating the ContractFactory.
    const redeemerContract = redeemerFactory.attach(
      '0x004a0304523554961578f2b7050BDFdE57625228'
    );

    const theVoucher = {
      needId: voucher.needId,
      userId: voucher.userId,
      needTitle: voucher.needTitle,
      needImage: voucher.needImage,
      content: voucher.content,
      signature: voucher.signature,
    };

    console.log(
      voucher.needId,
      '0x004a0304523554961578f2b7050BDFdE57625228',
      theVoucher
    );

    await redeemerContract.safeFamilyMint(
      voucher.needId,
      '0x004a0304523554961578f2b7050BDFdE57625228',
      theVoucher
    );

    dispatch({
      type: MINT_SUCCESS,
      payload: voucher,
    });
  } catch (e) {
    console.log('problem buying: ');
    console.log({ e });
    dispatch({
      type: MINT_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.message,
    });
  }
};
