
import './App.css';
import AxiosCrud from './Axios/AxiosCrud';
import AxiosInterceptorsCrud from './AxiosInstant/AxiosInstaintCrud';
import GetData from './Comopnet/GetData';
import GetDataViaId from './Comopnet/GetDataViaId';
import PostData from './Comopnet/PostData';

function App() {
  console.log(process.env.REACT_APP_URL,"YES..");
  
  return (
        //Using Fetch
      //  <>
      //  <GetDataViaId></GetDataViaId>
      //  <PostData></PostData>
      //  <GetData></GetData>
      //  </>

    //  using Axios
    //   <>
    // <AxiosCrud></AxiosCrud>
    //   </>

    //using AxiosInstant
    <>
    <AxiosInterceptorsCrud></AxiosInterceptorsCrud>
    </>
  );
}

export default App;
