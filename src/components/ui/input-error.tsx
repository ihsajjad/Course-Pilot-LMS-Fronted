
const InputError = ({ msg }: { msg: string }) => {
  return <p className="text-sm font-medium text-destructive/60 dark:text-destructive -mt-1.5">{msg}</p>;
};

export default InputError;
