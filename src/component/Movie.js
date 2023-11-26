import React, { useEffect, useState } from 'react';
import { HiShare } from 'react-icons/hi';
import { AiFillHeart } from 'react-icons/ai';
import { BiSolidComment } from 'react-icons/bi';

function Movie() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const apiKey = '1a85467aa576e7e8ec1d09bc874e5c20';
    let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

    if (searchQuery) {
      apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.log('Error fetching data:', error));
  }, [searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='movie'>
      <h1 className='mb-10 text-center solid underline font-mono text-3xl font-bold shadow-3xl'>Movie List</h1>

      <div className='search'>
        <input
          type='text'
          placeholder='Search for a movie'
          value={searchQuery}
          onChange={handleSearch}
          className='w-full p-2 border border-black solid rounded bold'
        />
      </div>

      <div className='movieList flex flex-wrap ml-14 overflow-x-auto snap-x 
                      scroll-smooth justify-evenly p-8 gap-5 grow-4'>
        {filteredMovies.map((movie) => (
          <div key={movie.id} className='movieCard flex-auto relative top-10 left-16 
           w-60 ml-10 mr-80 p-7  bg-gray-200 rounded-md shadow-2xl 
          transform transition-transform duration-300 snap-start 
          transform hover:scale-105 hover:text-pink'>
            <div className='movieImage '>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className='h-50 w-40'
            />
            
            <div className='movieDetails relative'>
            <h2 className='text-sm mb-5 font-bold absolute top-[-240px] left-48'>{movie.title}</h2>
            <h3 className='text-xs font-bold absolute top-[-130px] left-48'>{movie.release_date}</h3>
            <div className=''><p className='text-xs w-95 flex'>{movie.overview}</p></div>
          </div>
          </div>
          <div className='icon-container flex items-center'>
          <div className='share-icon flex relative '>
              <HiShare />
          <div/>

          <div className='heart-icon absolute top-100 left-10'>
              <AiFillHeart />
          </div>

          <div className='comment-icon absolute top-90 left-20'>
              <BiSolidComment />
          </div>
          </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movie;