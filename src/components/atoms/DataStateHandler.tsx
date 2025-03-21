import Spinner from "./Spinner";

const DataStateHandler = ({ isLoading, error, data, children }: any) => {
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

  if (!data || data.length === 0) {
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
