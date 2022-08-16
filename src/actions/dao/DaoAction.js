import { ethers } from 'ethers';
import { daoApi, publicApi } from '../../apis/sayBase';
import {
  FAMILY_NETWORK_REQUEST,
  FAMILY_NETWORK_SUCCESS,
  FAMILY_NETWORK_FAIL,
  SIGNATURE_REQUEST,
  SIGNATURE_SUCCESS,
  SIGNATURE_FAIL,
} from '../../constants/daoConstants';
import Signature from '../../Signature';
import VerifyVoucher from '../../build/contracts/tokens/ERC721/VerifyVoucher.sol/VerifyVoucher.json';

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

export const signTransaction =
  (needId, needTitle, needImage, userId, impacts) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SIGNATURE_REQUEST });

      await window.ethereum.enable();
      // eslint-disable-next-line no-undef
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();
      // const theSellingPrice_BN = ethers.utils.parseUnits(
      //   price.toString(),
      //   'ether'
      // );

      const VerifySignature = new ethers.ContractFactory(
        VerifyVoucher.abi,
        VerifyVoucher.bytecode,
        signer
      );

      const signerContract = VerifySignature.attach(
        '0x004a0304523554961578f2b7050BDFdE57625228'
      );

      const theSignature = new Signature({ contract: signerContract, signer });

      const voucher = await theSignature.signTransaction(
        needId,
        needTitle,
        needImage,
        userId,
        impacts
      );

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: userInfo && userInfo.accessToken,
        },
      };
      const { data } = await daoApi.post(
        `/sign/?needId=${needId}&userId=${userId}`,
        config
      );

      dispatch({
        type: SIGNATURE_SUCCESS,
        payload: { data, voucher, signerAddress },
      });
    } catch (e) {
      // check for generic and custom message to return using ternary statement
      dispatch({
        type: SIGNATURE_FAIL,
        payload: e.response && e.response.status ? e.response : e.message,
      });
    }
  };
