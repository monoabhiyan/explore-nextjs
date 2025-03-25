'use client' // Error boundaries must be Client Components
import { useEffect } from 'react'

export default function ErrorComponent({
  error,
  resetErrorBoundary
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => resetErrorBoundary()}>
        Try again
      </button>
    </div>
  );
}
