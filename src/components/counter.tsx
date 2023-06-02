import { useReducer, FormEvent, FormEventHandler } from 'react';

type InitialState = {
  count: number;
  draftCount: number | string;
};

const initialState: InitialState = {
  count: 0,
  draftCount: 0,
};

type Action = {
  type: 'increment' | 'decrement' | 'reset' | 'updateCountFromDraft';
};

type ActionWithPayload = {
  type: 'updateDraftCount';
  payload: number | string;
};

const reducer = (state = initialState, action: Action | ActionWithPayload) => {
  const { count, draftCount } = state;

  switch (action.type) {
    case 'increment':
      return { ...state, count: count + 1, draftCount: count + 1 };
    case 'decrement':
      return { ...state, count: count - 1, draftCount: count - 1 };
    case 'reset':
      return { ...state, count: 0, draftCount: 0 };
    case 'updateDraftCount':
      return { ...state, draftCount: action.payload };
    case 'updateCountFromDraft':
      return { ...state, count: Number(draftCount) };
    default:
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    dispatch({ type: 'updateCountFromDraft' });
  };

  return (
    <section className="flex w-2/3 flex-col items-center gap-8 border-4 border-primary-500 bg-white p-8 shadow-lg">
      <h1>Days Since the Last Accident</h1>
      <p className="text-6xl">{state.count}</p>
      <div className="flex gap-2">
        <button onClick={() => dispatch({ type: 'decrement' })}>
          ➖ Decrement
        </button>
        <button onClick={() => dispatch({ type: 'reset' })}>🔁 Reset</button>
        <button onClick={() => dispatch({ type: 'increment' })}>
          ➕ Increment
        </button>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={state.draftCount}
            onChange={(e) =>
              dispatch({
                type: 'updateDraftCount',
                payload: e.target.valueAsNumber,
              })
            }
          />
          <button type="submit">Update Counter</button>
        </form>
      </div>
    </section>
  );
};

export default Counter;
