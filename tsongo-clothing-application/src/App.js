import Home from "./routes/home/home.component";
import Shop from "./routes/shop/shop.component";
import Navigation from "./routes/navigation/navigation.component";
import { Routes,Route} from "react-router-dom";
import Authentification from "./routes/authentification/authentification.component";

const App=()=>{
return(
<Routes>
<Route>
<Route path="/" element={<Navigation/>}>
<Route index element={<Home/>}/>    
<Route path="/shop" element={<Shop/>}/>    
<Route path="/auth" element={<Authentification/>}/>    
</Route>   
</Route>
</Routes>
)
}
export default App;
