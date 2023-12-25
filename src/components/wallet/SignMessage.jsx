import React, { useRef } from 'react';
import { useSignMessage } from 'wagmi';
import { verifyMessage } from 'ethers/lib/utils';
import { LoadingButton } from '@mui/lab';

export default function SignMessage() {
  const recoveredAddress = useRef();
  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(successData, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, successData);
      recoveredAddress.current = address;
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const message = formData.get('message');
        signMessage({ message });
      }}
    >
      <textarea id="message" name="message" placeholder="The quick brown fox…" />
      <LoadingButton type="submit" disabled={isLoading}>
        {isLoading ? 'Check Wallet' : 'Sign Message'}
      </LoadingButton>

      {data && (
        <div>
          <div>Recovered Address: {recoveredAddress.current}</div>
          <div>Signature: {data}</div>
        </div>
      )}

      {error && <div>{error.message}</div>}
    </form>
  );
}
