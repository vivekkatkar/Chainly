export const ZapCell = ({
  name,
  index,
  image,
  onClick
}: {
  name: string;
  index: number;
  image : string | undefined;
  onClick : () => void
}) => {
  return (
    <div onClick={onClick} className="bg-white my-2 rounded-2xl px-6 py-5 w-[300px] justify-center items-center shadow-lg border border-gray-200 flex flex-col gap-1">
      <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">
        Step {index}
      </span>
     <div className="flex items-center justify-center space-x-1">
        <img src={image} className="w-10 h-8" alt="icon" />
        <div  className="text-gray-900 pb-1 flex items-center text-xl font-bold">{capitalizeFirstLetter(name)}</div>
      </div>
    </div>
  );
};

function capitalizeFirstLetter(str : string) {
  if (str.length === 0) {
    return ""; 
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
