/* eslint-disable react/prop-types */
const Dropdown = ({ data, setData, setShow }) => {
  return (
    <div className="absolute top-full left-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg z-50">
      <div className="py-1">
        {data?.map((type) => (
          <button
            key={type}
            onClick={() => {
              setData(type);
              setShow(false);
            }}
            className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 text-left capitalize"
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
