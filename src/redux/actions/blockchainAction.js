// import { daoApi } from '../../apis/sayBase';
// import {
//   SIGNATURE_REQUEST,
//   SIGNATURE_FAIL,
//   SIGNATURE_SUCCESS,
//   USER_SIGNATURES_REQUEST,
//   USER_SIGNATURES_SUCCESS,
//   USER_SIGNATURES_FAIL,
// } from '../constants/daoConstants';

// export const fetchUserSignatures = () => async (dispatch, getState) => {
//   try {
//     dispatch({ type: USER_SIGNATURES_REQUEST });
//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: userInfo && userInfo.accessToken,
//         flaskId: userInfo && userInfo.id,
//       },
//     };

//     const { data } = await daoApi.get(`/wallet/family/signatures/ready${userInfo.id}`, config);

//     dispatch({
//       type: USER_SIGNATURES_SUCCESS,
//       payload: data,
//     });
//   } catch (e) {
//     // check for generic and custom message to return using ternary statement
//     dispatch({
//       type: USER_SIGNATURES_FAIL,
//       payload: e.response && (e.response.status ? e.response : e.response.data.message),
//     });
//   }
// };

// export const signTransaction = (values, signer) => async (dispatch) => {
//   try {
//     dispatch({ type: SIGNATURE_REQUEST });

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       withCredentials: true,
//     };

//     const request = {
//       flaskNeedId: values.flaskNeedId,
//       signerAddress: values.address,
//       statuses: values.statuses,
//       receipts: values.receipts,
//       payments: values.payments,
//     };

//     const result1 = await daoApi.post(`/wallet/signature/prepare`, request, config);
//     const transaction = result1.data;
//     console.log(transaction);
//     // The named list of all type definitions
//     const types = {
//       ...transaction.types,
//     };
//     const signatureHash = await signer.signTypedData({
//       domain: transaction.domain,
//       types,
//       primaryType: 'Voucher',
//       message: {
//         ...transaction.message,
//       },
//     });

//     const request2 = {
//       flaskNeedId: values.flaskNeedId,
//       statuses: values.statuses,
//       receipts: values.receipts,
//       payments: values.payments,
//       sayRole: transaction.sayRole,
//     };
//     const result2 = await daoApi.post(
//       `/wallet/signature/create/${signatureHash}`,
//       request2,
//       config,
//     );
//     const { ipfs, signature } = result2.data;
//     dispatch({
//       type: SIGNATURE_SUCCESS,
//       payload: { transaction, ipfs, signature },
//     });
//   } catch (e) {
//     console.log(e);
//     dispatch({
//       type: SIGNATURE_FAIL,
//       payload:
//         e.response && e.response.data.detail
//           ? e.response.data.detail
//           : e.response && e.response.data.message
//           ? e.response.data.message
//           : { reason: e.reason, code: e.code }, // metamask signature
//     });
//   }
// };
