import React, { ComponentType } from "react";

interface WithLoadingProps {
  isLoading: boolean;
}

export function withLoading<P extends object>(
  WrappedComponent: ComponentType<P>,
) {
  return function WithLoadingComponent({
    isLoading,
    ...props
  }: WithLoadingProps & P) {
    if (isLoading) {
      return (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Загрузка...</p>
        </div>
      );
    }

    return <WrappedComponent {...(props as P)} />;
  };
}
