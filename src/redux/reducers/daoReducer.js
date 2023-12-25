import {
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
  MY_READY_PAID_NEEDS_REQUEST,
  MY_PAID_NEEDS_SUCCESS,
  MY_PAID_NEEDS_FAIL,
  READY_TO_SIGN_ONE_NEED_REQUEST,
  READY_TO_SIGN_ONE_NEED_SUCCESS,
  READY_TO_SIGN_ONE_NEED_FAIL,
  READY_TO_SIGN_ONE_NEED_RESET,
  ONE_NEED_COLLECTIVE_RATIO_FAIL,
  ONE_NEED_COLLECTIVE_RATIO_REQUEST,
  ONE_NEED_COLLECTIVE_RATIO_SUCCESS,
  FAMILY_ECOSYSTEM_PAYS_REQUEST,
  FAMILY_ECOSYSTEM_PAYS_SUCCESS,
  FAMILY_ECOSYSTEM_PAYS_FAIL,
  ONE_NEED_PERSONAL_RATIO_REQUEST,
  ONE_NEED_PERSONAL_RATIO_SUCCESS,
  ONE_NEED_PERSONAL_RATIO_FAIL,
  ECOSYSTEM_MINT_REQUEST,
  ECOSYSTEM_MINT_SUCCESS,
  ECOSYSTEM_MINT_FAIL,
  SIGNATURE_VERIFICATION_REQUEST,
  SIGNATURE_VERIFICATION_SUCCESS,
  SIGNATURE_VERIFICATION_FAIL,
  SIGNATURE_VERIFICATION_RESET,
  FAMILY_ECOSYSTEM_PAYS_REST,
  ONE_NEED_COLLECTIVE_RATIO_RESET,
  ONE_NEED_PERSONAL_RATIO_REST,
  ECOSYSTEM_MINT_RESET,
  SIGNATURE_PREPARE_REQUEST,
  SIGNATURE_PREPARE_SUCCESS,
  SIGNATURE_PREPARE_FAIL,
  SIGNATURE_CREATE_REQUEST,
  SIGNATURE_CREATE_SUCCESS,
  SIGNATURE_CREATE_FAIL,
  SIGNATURE_HASH_REQUEST,
  SIGNATURE_HASH_SUCCESS,
  SIGNATURE_HASH_FAIL,
  SIGNATURE_CREATE_RESET,
  MY_PAID_NEEDS_RESET,
} from '../constants/daoConstants';

export const ecosystemAnalyticReducer = (state = {}, action) => {
  switch (action.type) {
    case FAMILY_ECOSYSTEM_PAYS_REQUEST:
      return { loading: true, success: false };
    case FAMILY_ECOSYSTEM_PAYS_SUCCESS:
      return { ...state, loading: false, success: true, ecoResult: action.payload };
    case FAMILY_ECOSYSTEM_PAYS_FAIL:
      return { success: false, loading: false, error: action.payload };
    case FAMILY_ECOSYSTEM_PAYS_REST:
      return {};
    default:
      return state;
  }
};

export const ecosystemMintAnalyticReducer = (state = {}, action) => {
  switch (action.type) {
    case ECOSYSTEM_MINT_REQUEST:
      return { loading: true, success: false };
    case ECOSYSTEM_MINT_SUCCESS:
      return { ...state, loading: false, success: true, mintEcoResult: action.payload };
    case ECOSYSTEM_MINT_FAIL:
      return { success: false, loading: false, error: action.payload };
    case ECOSYSTEM_MINT_RESET:
      return {};
    default:
      return state;
  }
};

export const needVariablesAnalyticReducer = (state = {}, action) => {
  switch (action.type) {
    case ONE_NEED_COLLECTIVE_RATIO_REQUEST:
      return {
        personalResult: state.personalResult && { ...state.personalResult },
        loading: true,
        success: false,
      };
    case ONE_NEED_COLLECTIVE_RATIO_SUCCESS:
      return { ...state, loading: false, success: true, collectiveResult: action.payload };
    case ONE_NEED_COLLECTIVE_RATIO_FAIL:
      return { success: false, loading: false, error: action.payload };
    case ONE_NEED_COLLECTIVE_RATIO_RESET:
      return { personalResult: state.personalResult && { ...state.personalResult } };
    case ONE_NEED_PERSONAL_RATIO_REQUEST:
      return {
        collectiveResult: state.collectiveResult && { ...state.collectiveResult },
        loading: true,
        success: false,
      };
    case ONE_NEED_PERSONAL_RATIO_SUCCESS:
      return { ...state, loading: false, success: true, personalResult: action.payload };
    case ONE_NEED_PERSONAL_RATIO_FAIL:
      return { success: false, loading: false, error: action.payload };
    case ONE_NEED_PERSONAL_RATIO_REST:
      return { collectiveResult: state.collectiveResult && { ...state.collectiveResult } };
    default:
      return state;
  }
};

export const readyToSignNeedsReducer = (state = {}, action) => {
  switch (action.type) {
    case MY_READY_PAID_NEEDS_REQUEST:
      return { loading: true, success: false };
    case MY_PAID_NEEDS_SUCCESS:
      return { loading: false, success: true, paidNeedsData: action.payload };
    case MY_PAID_NEEDS_FAIL:
      return { loading: false, error: action.payload };
    case MY_PAID_NEEDS_RESET:
      return {};
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
      return { ...state, loading: false, success: true, swVerifiedAddress: action.payload };
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
    // prepare
    case SIGNATURE_PREPARE_REQUEST:
      return { ...state, loading: true, success: false };
    case SIGNATURE_PREPARE_SUCCESS:
      return { ...state, loading: false, success: true, prepared: action.payload };
    case SIGNATURE_PREPARE_FAIL:
      return { loading: false, error: action.payload };
    // hash
    case SIGNATURE_HASH_REQUEST:
      return { ...state, loading: true, success: false };
    case SIGNATURE_HASH_SUCCESS:
      return { ...state, loading: false, success: true, signatureHash: action.payload };
    case SIGNATURE_HASH_FAIL:
      return { loading: false, error: action.payload };
    // create
    case SIGNATURE_CREATE_REQUEST:
      return { ...state, loading: true, success: false };
    case SIGNATURE_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, createdSignature: action.payload };
    case SIGNATURE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SIGNATURE_CREATE_RESET:
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
