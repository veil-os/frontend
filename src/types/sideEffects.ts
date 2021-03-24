export type UninitializedState = {
  state: "UNINITIALIZED";
};

export type PendingState = {
  state: "PENDING";
};

export type SuccessState<T> = {
  state: "SUCCESS";
  data: T;
};

export type ErrorState = {
  state: "ERROR";
  error: Error;
};

export type SideEffectState<T> = UninitializedState | PendingState | SuccessState<T> | ErrorState;
