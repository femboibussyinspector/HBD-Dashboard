import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { productData } from '@/data/productJSON'; 
import api from '@/utils/Api';
const ProductComplete = () => {
  const [loading, setLoading] = useState(false);
  const [fullData,setFullData] = useState(productData);  
  const [data, setData] = useState([]);    
  const [currentPage, setCurrentPage] = useState(1); 
  const limit = 10;

  const totalPages = Math.ceil(fullData.length / limit);

  // const fetchData = () => {
  //   const start = (currentPage - 1) * limit;
  //   const currData = fullData.slice(start, start + limit);      ---> Mock Data Code
  //   setData(currData);
  // };
  
  const fetchData = async () => {
    const res = await api.get("/api/results");
    setFullData(res.data);  
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {  
    const start = (currentPage - 1) * limit;  
    const currData = fullData.slice(start, start + limit);
    setData(currData);
  }, [currentPage,fullData])
  
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 px-4">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-4 flex items-center justify-between"
        >
          <Typography variant="h6" color="white">Country Data</Typography>

          <div className="flex items-center gap-4">
            <Button
              variant="outlined"
              color="white"
              className="flex items-center gap-2"
              onClick={() => console.log("Download CSV")}
            >
              Download CSV
            </Button>

            <Typography variant="h6" color="white">
              Total: {fullData.length}
            </Typography>
          </div>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["ASIN","Product Name","Price","Rating","Rating Count","Brand","Seller",
                "Category","Sub-Category","Sub-Sub Category","Sub-Sub-Sub Category","Colour","Size(s)","Description","Link","Image URls","About Items","Product Details","Additional Details","Manufacturer Name"].map((head) => (
                  <th key={head} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography
                      variant="small"
                      className="text-[15px] text-black font-bold uppercase "
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((item, idx) => (

                <tr key={item.name}>
                  <td className="py-3 px-5">{item.ASIN || "-"}</td>
                  <td className="py-3 px-5">{item.Product_name || "-"}</td>
                  <td className="py-3 px-5">{item.price || "-"}</td>
                  <td className="py-3 px-5">{item.rating || "-"}</td>
                  <td className="py-3 px-5">{item.Number_of_ratings || "-"}</td>
                  <td className="py-3 px-5">{item.Brand || "-"}</td>
                  <td className="py-3 px-5">{item.Seller || "-"}</td>
                  <td className="py-3 px-5">{item.category || "-"}</td>
                  <td className="py-3 px-5">{item.subcategory || "-"}</td>
                  <td className="py-3 px-5">{item.sub_sub_category || "-"}</td>
                  <td className="py-3 px-5">{item.category_sub_sub_sub || "-"}</td>
                  <td className="py-3 px-5">{item.colour || "-"}</td>
                  <td className="py-3 px-5">{item.size_options || "-"}</td>
                  <td className="py-3 px-5">{item.description || "-"}</td>
                  <td className="py-3 px-5 text-blue-500"><a href={`${item.link}`}>{item.link.length > 30 ? item.link.substring(0, 30) + "..." : item.link}</a></td>
                  <td className="py-3 px-5">{item.Image_URLs || "-"}</td>
                  <td className="py-3 px-5">{item.About_the_items_bullet || "-"}</td>
                  {/* <td className="py-3 px-5">{item.Product_details || "-"}</td> */}
                  {/* <td className="py-3 px-5">{item.Additional_Details || "-"}</td> */}
                  <td className="py-3 px-5">{item.Manufacturer_Name || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
        <button
          className="px-3 py-1 rounded bg-blue-500 text-white disabled:bg-gray-300"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Previous
        </button>

        <button
            className="px-3 py-1 rounded border 
                bg-white text-blue-500
            "
          >
            {currentPage}
          </button>

        <button
          className="px-3 py-1 rounded bg-blue-500 text-white disabled:bg-gray-300"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductComplete;
