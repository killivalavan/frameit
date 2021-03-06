import { useEffect, useState, useRef} from 'react';
import Gallery from './Components/Gallery';
import styled from 'styled-components';
import { GlobalStyle } from './Components/GlobalStyle';


function App() {

  const [images, setImages] = useState([]);
  const [update, setUpdate] = useState("");
  const [search, setSearch] = useState("culture");
  const [pageNumber , setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef();

  useEffect(() => {
    getImages();
    setIsLoading(false)
  }, [search, pageNumber])
 
//Infinity Scroll

// useEffect(() => {
//   if(loading) {
//     const observer = new IntersectionObserver(entries =>{
//      if(entries[0].isIntersecting){
//        loadMore();
//      }

//     },{threshold: 1});

//     observer.observe(pageEnd.current)
//   }

// },[loading])


  const getImages = async ()=>{
      const API_KEY = process.env.REACT_APP_UNSPLASH_KEY;
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${search}&client_id=${API_KEY}&page=${pageNumber}&per_page=30`);
      const data = await response.json();
      const photo = data.results
     
      setImages(photo);
  }



  const onchangeHandler = (e) =>{
    setUpdate(e.target.value); 
  }

  const clearHandler = () =>{
    inputRef.current.value = "";
  }

  const onSubmitHandler = (e) =>{
    e.preventDefault();

    setSearch(update);
    setPageNumber(1);
    clearHandler();
  }


  return (
    <div className="App">
      <GlobalStyle />
      <StyledSearch>
        {!isLoading && images.length === 0 &&  <Alert>No Images Found !!!</Alert>}
          <form onSubmit={onSubmitHandler}>
              <input ref={inputRef} onChange={onchangeHandler} type="text" placeholder="Search here..." />
          </form>
      </StyledSearch>
      <Gallery isLoading={isLoading} setPageNumber={setPageNumber} images={images}/>
    </div>
  );
}


const StyledSearch = styled.div`
      
    form{   
        position: fixed;
        bottom: 8%;
        left: 50%;
        transform: translate(-50%, -8%);
        z-index: 1;
    }
    input{
        padding: 1rem 2rem;
        border-radius: 50px;
        background: rgba(0, 0, 0, 0.6);
        color: white;
        border: 4px solid #696969;
        outline: none;
        width: 50rem;
        font-size: 2rem;
    }
    @media screen and (max-width: 680px){
      input{
        padding: .3rem 2rem;
        width: 25rem;
        font-size: 1.5rem;
      }
    }
`;

const Alert = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  @media screen and (max-width: 680px){
    font-size: 2rem;
  }
`;

export default App;
