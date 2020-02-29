const MultipleReturns = () => {
  if (someArg) {
    return null;
  }

  if (someOtherArg) {
    return false;
  }
  return <div>test</div>;
};
