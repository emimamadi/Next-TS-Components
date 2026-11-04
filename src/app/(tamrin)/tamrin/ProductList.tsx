type Product = {
  id: string;
  title: string;
};

type ProductListProps = {
  allData?: Product[];
};

export default function ProductList({ allData = [] }: ProductListProps) {
  return (
    <div className="bg-amber-500 w-[95%] mx-auto flex flex-col justify-center my-10 ">
      <h1 className="w-full h-10 text-center text-red-500">Fetched Data</h1>
      {allData.length > 0 ? (
        <ul className="bg-blue-300 w-[80%] mx-auto h-10">
          {allData.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      ) : (
        <p className="bg-red-300">No data available</p>
      )}
    </div>
  );
}
