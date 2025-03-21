import { getErrorMessage } from "@/utils/errors";
import Spinner from "./Spinner";

interface DataStateHandlerProps<T> {
  isLoading: boolean;
  error: unknown;
  data?: T | null;
  children: React.ReactNode;
}

const DataStateHandler = <T,>({
  isLoading,
  error,
  data,
  children,
}: DataStateHandlerProps<T>) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center py-400">
        {getErrorMessage(error)}
      </p>
    );
  }

  const isEmpty =
    data === null ||
    data === undefined ||
    (Array.isArray(data) && data.length === 0);

  if (isEmpty) {
    return (
      <div className="flex flex-col justify-center items-center h-[300px] text-grey-500">
        <p className="text-preset-4 text-grey-900 font-medium">No data found</p>
        <p className="text-sm">Start by adding an entry.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default DataStateHandler;
