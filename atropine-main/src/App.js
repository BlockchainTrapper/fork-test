import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Compound from "./pages/compound/Compound";
import Farm from "./pages/farm/Farm";
import Home from "./pages/home/Home";
function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/farm" element={<Farm />} />
					<Route path="/autocompound" element={<Compound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
