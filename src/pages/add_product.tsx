import { useState } from "react";
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


const AddProduct = () => {
    const [nombre_prod, setNombreProd] = useState("");
    const [precio, setPrecio] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // For redirection

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!nombre_prod || !precio) {
            setError("Se necesitan ambos campos");
            return;
        }

        const user = localStorage.getItem("user");
        if (!user) {
            setError("Usuario no autenticado");
            return;
        }
        const userObj = JSON.parse(user);

        const userData = {
            "duenio": userObj.username,
            "producto": nombre_prod,
            "precio": precio,
        };

        try {
            await fetch("http://18.119.163.106/put_prods_duenio/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            console.log("Producto añadido con éxito");
            navigate("/barchart");

        } catch (error) {
            console.error("Error:", error);
            setError("Error al conectar con el servidor");
        }
    };



    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-gray-900 to-black text-white">
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="w-96 p-8 bg-white rounded-2xl shadow-2xl border border-gray-200">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Ingrese Producto</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="text"
                            placeholder="producto"
                            value={nombre_prod}
                            onChange={(e) => setNombreProd(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="precio"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <button
                            type="submit"
                            className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition duration-300">
                            Añadir producto
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
