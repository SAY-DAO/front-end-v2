import {
  SIGNATURE_REQUEST,
  SIGNATURE_SUCCESS,
  SIGNATURE_FAIL,
  SIGNATURE_RESET,
  WALLET_NONCE_REQUEST,
  WALLET_NONCE_SUCCESS,
  WALLET_NONCE_FAIL,
  WALLET_VERIFY_REQUEST,
  WALLET_VERIFY_SUCCESS,
  WALLET_VERIFY_FAIL,
  WALLET_INFORMATION_REQUEST,
  WALLET_INFORMATION_SUCCESS,
  WALLET_INFORMATION_FAIL,
  CONTRIBUTION_LIST_REQUEST,
  CONTRIBUTION_LIST_SUCCESS,
  CONTRIBUTION_LIST_FAIL,
  WALLET_VERIFY_RESET,
  WALLET_INFORMATION_RESET,
  USER_SIGNATURES_REQUEST,
  USER_SIGNATURES_SUCCESS,
  USER_SIGNATURES_FAIL,
  MY_PAID_NEEDS_REQUEST,
  MY_PAID_NEEDS_SUCCESS,
  MY_PAID_NEEDS_FAIL,
  READY_TO_SIGN_ONE_NEED_REQUEST,
  READY_TO_SIGN_ONE_NEED_SUCCESS,
  READY_TO_SIGN_ONE_NEED_FAIL,
  READY_TO_SIGN_ONE_NEED_RESET,
  ONE_NEED_COEFFS_FAIL,
  ONE_NEED_COEFFS_REQUEST,
  ONE_NEED_COEFFS_SUCCESS,
  FAMILY_ECOSYSTEM_PAYS_REQUEST,
  FAMILY_ECOSYSTEM_PAYS_SUCCESS,
  FAMILY_ECOSYSTEM_PAYS_FAIL,
  FAMILY_DISTANCE_RATIO_REQUEST,
  FAMILY_DISTANCE_RATIO_SUCCESS,
  FAMILY_DISTANCE_RATIO_FAIL,
  ECOSYSTEM_MINT_REQUEST,
  ECOSYSTEM_MINT_SUCCESS,
  ECOSYSTEM_MINT_FAIL,
  SIGNATURE_VERIFICATION_REQUEST,
  SIGNATURE_VERIFICATION_SUCCESS,
  SIGNATURE_VERIFICATION_FAIL,
  SIGNATURE_VERIFICATION_RESET,
  FAMILY_ECOSYSTEM_PAYS_REST,
  ONE_NEED_COEFFS_RESET,
  FAMILY_DISTANCE_RATIO_REST,
} from '../constants/daoConstants';

export const ecosystemAnalyticReducer = (state = {}, action) => {
  switch (action.type) {
    case ONE_NEED_COEFFS_REQUEST:
      return { ...state, loading: true, success: false };
    case ONE_NEED_COEFFS_SUCCESS:
      return { ...state, loading: false, success: true, coeffsResult: action.payload };
    case ONE_NEED_COEFFS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ONE_NEED_COEFFS_RESET:
      return {};
    case FAMILY_DISTANCE_RATIO_REQUEST:
      return { ...state, loading: true, success: false };
    case FAMILY_DISTANCE_RATIO_SUCCESS:
      return { ...state, loading: false, success: true, userResult: action.payload };
    case FAMILY_DISTANCE_RATIO_FAIL:
      return { ...state, loading: false, error: action.payload };
    case FAMILY_DISTANCE_RATIO_REST:
      return {};
    case ECOSYSTEM_MINT_REQUEST:
      return { ...state, loading: true, success: false };
    case ECOSYSTEM_MINT_SUCCESS:
      return { ...state, loading: false, success: true, mintEcoResult: action.payload };
    case ECOSYSTEM_MINT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case FAMILY_ECOSYSTEM_PAYS_REQUEST:
      return { ...state, loading: true, success: false };
    case FAMILY_ECOSYSTEM_PAYS_SUCCESS:
      return { ...state, loading: false, success: true, ecoResult: action.payload };
    case FAMILY_ECOSYSTEM_PAYS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case FAMILY_ECOSYSTEM_PAYS_REST:
      return {};
    default:
      return state;
  }
};

export const readyToSignNeedsReducer = (state = {}, action) => {
  switch (action.type) {
    case MY_PAID_NEEDS_REQUEST:
      return { loading: true, success: false };
    case MY_PAID_NEEDS_SUCCESS:
      return { loading: false, success: true, paidNeedsData: action.payload };
    case MY_PAID_NEEDS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const readyToSignOneNeedReducer = (state = {}, action) => {
  switch (action.type) {
    case READY_TO_SIGN_ONE_NEED_REQUEST:
      return { loading: true, success: false };
    case READY_TO_SIGN_ONE_NEED_SUCCESS:
      return { loading: false, success: true, oneReadyNeed: action.payload };
    case READY_TO_SIGN_ONE_NEED_FAIL:
      return { loading: false, error: action.payload };
    case READY_TO_SIGN_ONE_NEED_RESET:
      return {};
    default:
      return state;
  }
};

export const walletNonceReducer = (state = {}, action) => {
  switch (action.type) {
    case WALLET_NONCE_REQUEST:
      return { loading: true, success: false };
    case WALLET_NONCE_SUCCESS:
      return { loading: false, success: true, nonceData: action.payload };
    case WALLET_NONCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const walletVerifyReducer = (state = {}, action) => {
  switch (action.type) {
    case WALLET_VERIFY_REQUEST:
      return { loading: true, success: false };
    case WALLET_VERIFY_SUCCESS:
      return { loading: false, success: true, verifiedNonce: action.payload };
    case WALLET_VERIFY_FAIL:
      return { loading: false, error: action.payload };
    case WALLET_VERIFY_RESET:
      return {};
    default:
      return state;
  }
};
export const walletInformationReducer = (state = {}, action) => {
  switch (action.type) {
    case WALLET_INFORMATION_REQUEST:
      return { loading: true, success: false };
    case WALLET_INFORMATION_SUCCESS:
      return { loading: false, success: true, information: action.payload };
    case WALLET_INFORMATION_FAIL:
      return { loading: false, error: action.payload };
    case WALLET_INFORMATION_RESET:
      return {};
    default:
      return state;
  }
};

export const signatureVerificationReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNATURE_VERIFICATION_REQUEST:
      return { ...state, loading: true, success: false };
    case SIGNATURE_VERIFICATION_SUCCESS:
      return { ...state, loading: false, success: true, verifiedSwAddress: action.payload };
    case SIGNATURE_VERIFICATION_FAIL:
      return { loading: false, error: action.payload };
    case SIGNATURE_VERIFICATION_RESET:
      return {};
    default:
      return state;
  }
};

export const signatureReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNATURE_VERIFICATION_REQUEST:
      return { ...state, loading: true, success: false };
    case SIGNATURE_VERIFICATION_SUCCESS:
      return { ...state, loading: false, success: true, verifiedAddress: action.payload };
    case SIGNATURE_REQUEST:
      return { ...state, loading: true, success: false };
    case SIGNATURE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        signature: action.payload.signature,
        transaction: action.payload.transaction,
      };
    case SIGNATURE_FAIL:
      return { loading: false, error: action.payload };
    case SIGNATURE_RESET:
      return {};
    default:
      return state;
  }
};

export const userSignaturesReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNATURES_REQUEST:
      return { loading: true, success: false };
    case USER_SIGNATURES_SUCCESS:
      return {
        loading: false,
        success: true,
        userSignatures: action.payload,
      };
    case USER_SIGNATURES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const contributionReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTRIBUTION_LIST_REQUEST:
      return { loading: true, success: false };
    case CONTRIBUTION_LIST_SUCCESS:
      return { loading: false, success: true, contributions: action.payload };
    case CONTRIBUTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
