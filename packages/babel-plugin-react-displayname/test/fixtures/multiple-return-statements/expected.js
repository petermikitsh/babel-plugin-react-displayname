const MultipleReturns = () => {
  if (someArg) {
    return null;
  }

  if (someOtherArg) {
    return false;
  }

  return React.createElement("div", null, "test");
};

MultipleReturns.displayName = "MultipleReturns";
