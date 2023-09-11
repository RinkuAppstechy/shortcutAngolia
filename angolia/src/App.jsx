/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
// import './App.css';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, InfiniteHits, Hits, Configure, Highlight, Stats, Pagination, RefinementList, SortBy } from "react-instantsearch";
import { useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { useInstantSearch } from 'react-instantsearch';
import Map from './Components/Map';

const searchClient = algoliasearch(import.meta.env.VITE_APPLICATION_ID, import.meta.env.VITE_SEARCH_ONLY_API_KEY);

function Product({ hit }) {
  return (
    <>
<div className="bg-white rounded-lg shadow-lg p-6 mt-20">
  <Highlight attribute="post_title" hit={hit} />
  <h1 className="text-3xl font-semibold mt-2">Title - {hit.post_title}</h1>
  <img src={hit.images.thumbnail.url} style={{width:'auto',height:'auto'}} alt="Post Image" className="mt-10 max-w-full h-auto items-center" />
  <p className="mt-10 text-gray-700 text-justify">{hit.content}</p>
</div>

    </>
    
  );
}

Product.propTypes = {
  hit: PropTypes.shape({
    post_title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

const App = () => {

  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    console.log(query);
  };

  return (
    <>
      <Header />
      <div className="text-center m-36">
      <InstantSearch searchClient={searchClient} indexName="wp_posts_post">
        <SearchBox className="text-black" onChange={handleSearch}/>
        <Stats className="text-xs" />
        {/* <RefinementList className='mt-4' attribute="posts" /> */}
        <SortBy
          items={[
            { label: 'Featured', value: 'wp_posts_post' },
            { label: 'Post name (asc)', value: 'wp_posts_post_name_asc' },
            { label: 'Post name (desc)', value: 'wp_posts_post_name_desc' },
          ]}
      />

        <Hits className="mt-5" hitComponent={Product} />
        <NoResultsBoundary fallback={<NoResults />} />
        <Configure hitsPerPage={5} />
        <Pagination className="mt-60 flex-row justify-start" />
      </InstantSearch>

      <h1>Map</h1>
      <Map />
      </div>


      <Footer />
      
    </>
  );
};

function NoResultsBoundary({ children, fallback }) {
  const { results } = useInstantSearch();

  // The `__isArtificial` flag makes sure not to display the No Results message
  // when no hits have been returned.
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
}

function NoResults() {
  const { indexUiState } = useInstantSearch();

  return (
    <div>
      <p className="text-red-500 text-lg">
        No results for <q>{indexUiState.query}</q>.
      </p>
    </div>
  );
}

export default App;


