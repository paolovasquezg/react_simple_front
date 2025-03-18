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


const CloseSession = () => {
    const navigate = useNavigate(); // For redirection

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.removeItem("user");
        navigate("/login");
    };



    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-gray-900 to-black text-white">
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="w-96 p-8 bg-white rounded-2xl shadow-2xl border border-gray-200">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Close session</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <button
                            type="submit"
                            className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition duration-300">
                            Log Out
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CloseSession;
