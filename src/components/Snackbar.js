const Snackbar = ({ error, onClose }) => {
  return (
    <div
      className={`fixed flex bottom-4 left-1/2 p-3 transform -translate-x-1/2 text-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-300 transition-opacity duration-500 `}
      role="alert"
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Error</span>
      <div>
        <span className="font-medium">The error details are listed below:</span>
        <ul className="mt-1.5 list-disc list-inside">
          {Object.entries(error).map(([key, value], index) => (
            <li
              key={index}
              className="font-semibold capitalize"
            >{`${key}: ${value}`}</li>
          ))}
        </ul>
      </div>
      <button onClick={onClose} className="absolute top-1 right-2 text-lg">
        &times;
      </button>
    </div>
  );
};

export default Snackbar;
