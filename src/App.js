import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './Components/MovieList';
import MovieListHeading from './Components/MovieListHeading';
import SearchBox from './Components/SearchBox';
import AddFavourites from './Components/AddFavourites';
import RemoveFavourite from './Components/RemoveFavourite';

const App =()=>{



  const[movies, setMovies]= useState([])
  const[favourites,setFavourites]=useState([])
  const[searchValue, setSearchValue ]= useState(''); 
  const getMovieRequest = async ()=>{
    const url=`http://www.omdbapi.com/?s=${searchValue}&apikey=48fb8fc0`;

    const response=await fetch(url);
    const responsJson= await response.json();
   if(responsJson.Search  ){//IF ResponseJson has search result then setMovies
    setMovies(responsJson.Search);
   }
    
  }

  useEffect(()=>{
    getMovieRequest(searchValue);
  },[searchValue])
  
  useEffect(()=>{
    const movieFavourites=
    JSON.parse(localStorage.getItem('react-movie-app-favourites'));

    setFavourites(movieFavourites);
  },[]);

  const saveToLocalStorage=(items)=>{
    localStorage.setItem('react-movie-app-favourites',JSON.stringify(items))
  }

  const AddFavouriteMovie=(movie)=>{
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  const removeFavouriteMovie=(movie)=>{
    const newFavouriteList=favourites.filter((favourite)=>favourite.imdbID!==movie.imdbID);
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

 

  return (
     <div  className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4' > <MovieListHeading heading ='Movies'/>
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/> </div>
      <div className='row'>  
      <MovieList 
             movies={movies} 
             handleFavouritesClick={AddFavouriteMovie}
             favouriteComponent={AddFavourites}/>
             
      <MovieListHeading heading ='Favourites'/>    
      <MovieList 
             movies={favourites} 
             handleFavouritesClick={removeFavouriteMovie}
             favouriteComponent={RemoveFavourite}/>   </div></div>
  )
};
export default App; 