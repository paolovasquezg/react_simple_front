import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
    return (
        <nav className="w-full bg-blue-600 p-4 text-white flex justify-between">
            <h1 className="text-lg font-bold">Test</h1>
            <div>
                <Link to="/" className="mr-4">SignUp</Link>
                <Link to="/login" className="mr-4">LogIn</Link>
            </div>
        </nav>
    );
};


const LogIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // For redirection

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!username || !password) {
            setError("Se necesitan ambos campos");
            return;
        }

        try {
            const response = await fetch(`http://18.119.163.106/get_user/?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if (data.Estado === "No Realizado") {
                setError("Nombre de usuario o contraseña son incorrectos");
                return;
            }

            console.log("Usuario loggeado con éxito");
            localStorage.setItem("user", JSON.stringify(data)); // Store user data in localStorage
            navigate("/barchart"); // Redirect to dashboard

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
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Log In</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <button
                            type="submit"
                            className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition duration-300">
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
