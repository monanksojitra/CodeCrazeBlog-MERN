import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type InputProps = {
  type: string;
  placeholder: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  register?: any;
};
const InputBox = ({ type, placeholder, error, register }: InputProps) => {
  return (
    <div className="mb-4 space-y-1">
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-blue-600 focus-visible:shadow-none dark:border-dark-3 dark:text-black"
      />
      {error && (
        <span className="text-red-500 flex items-start justify-start text-sm">
          {error as any}
        </span>
      )}
    </div>
  );
};

export default InputBox;
