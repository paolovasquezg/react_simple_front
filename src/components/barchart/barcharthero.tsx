"use client";

import { useState, useEffect } from "react";
import { BarChart } from "@/components/barchart/BarChart.tsx";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    // Read and parse the user from localStorage
    let username = "";
    const userStr = localStorage.getItem("user");
    if (userStr) {
        try {
            const userObj = JSON.parse(userStr);
            username = userObj.username;
        } catch (error) {
            console.error("Error parsing user:", error);
        }
    }

    return (
        <nav className="w-full bg-blue-600 p-4 text-white flex justify-between">
            <h1 className="text-lg font-bold">
                Test {username && `: ${username}`}
            </h1>
            <div>
                <Link to="/barchart" className="mr-4">BarChart</Link>
                <Link to="/addproduct" className="mr-4">Add Product</Link>
                <Link to="/close" className="mr-4">Close Session</Link>
            </div>
        </nav>
    );
};

export const BarChartHero = () => {
    interface ChartDataItem {
        id: number;
        precio: number;
    }

    const [chartData, setChartData] = useState<ChartDataItem[]>([]);
    const [filteredData, setFilteredData] = useState<ChartDataItem[]>([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {

            const user = localStorage.getItem("user");
            if (!user) {
                console.error("Usuario no autenticado. Redirigiendo al login...");
                navigate("/login"); // Redirect if not logged in
                return;
            }

            try {
                const userObj = JSON.parse(user)
                const response = await fetch(`http://18.119.163.106/get_prods_duenio/?duenio=${userObj.username}`);
                const data = await response.json();
                console.log("Fetched data:", data);

                setChartData(data.products);
                setFilteredData(data.products); // Default: show all
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        

        fetchData();
        const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
        return () => clearInterval(interval);
    }, []);

    // Filter data when min/max price changes
    useEffect(() => {
        setFilteredData(
            chartData.filter(item => item.precio >= minPrice && item.precio <= maxPrice)
        );
    }, [minPrice, maxPrice, chartData]);

    return (
        <div className="bg-black min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-grow flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <div className="mb-4 flex gap-4">
                        <label className="text-black">
                            Min Price:
                            <input
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(Number(e.target.value))}
                                className="ml-2 p-2 border rounded"
                            />
                        </label>
                        <label className="text-black">
                            Max Price:
                            <input
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                className="ml-2 p-2 border rounded"
                            />
                        </label>
                    </div>

                    {/* BarChart Component */}
                    <BarChart
                        className="h-80 w-full max-w-xl"
                        data={filteredData}
                        index="producto"
                        categories={["precio"]}
                        valueFormatter={(number: number) =>
                            `$${Intl.NumberFormat("en-US").format(number)}`
                        }
                        onValueChange={(v) => console.log("Bar clicked:", v)}
                    />
                </div>
            </div>
        </div>
    );

}
