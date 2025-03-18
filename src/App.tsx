// import { useState } from "react";
// import { LineChartHero } from "@/components/linechart/linecharthero";
// import { BarChartHero } from "@/components/barchart/barcharthero";

// export default function App() {
//   const [showCharts, setShowCharts] = useState(true);

//   const refreshCharts = () => {
//     setShowCharts(false); // Oculta los gráficos temporalmente
//     setTimeout(() => setShowCharts(true), 100); // Los vuelve a mostrar después de 100ms
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-10 p-10">
//       <button
//         onClick={refreshCharts}
//         className="px-6 py-2 mb-5 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
//       >
//         Refrescar Gráficos
//       </button>

//       {showCharts && (
//         <>
//           <h1 className="text-4xl font-bold">LineChart</h1>
//           <LineChartHero />

//           <div className="h-10" /> {/* Espacio adicional entre los gráficos */}

//           <h1 className="text-4xl font-bold">BarChart</h1>
//           <BarChartHero />
//         </>
//       )}
//     </div>
//   );
// }

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "@/pages/signup.tsx";
import LogIn from "@/pages/login.tsx";
import CloseSession from "@/pages/close.tsx";
import AddProduct from "@/pages/add_product";
import { BarChartHero } from "@/components/barchart/barcharthero";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/close" element={<CloseSession />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/barchart" element={<BarChartHero />} />
      </Routes>
    </Router>
  );
};

export default App;
