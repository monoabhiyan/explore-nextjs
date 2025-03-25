'use client';

import {useQueryErrorResetBoundary} from "@tanstack/react-query";
import {ErrorBoundary} from "react-error-boundary";
import ErrorComponent from "@/components/error-component";
import {Suspense} from "react";
import UsersCard from "@/components/users-card";

export default function HomeComponent() {
  const {reset} = useQueryErrorResetBoundary()
  return (
    <ErrorBoundary
      onReset={reset}
      FallbackComponent={ErrorComponent}>
      <Suspense fallback={<div>loading...</div>}>
        <UsersCard/>
      </Suspense>
    </ErrorBoundary>
  );
}
