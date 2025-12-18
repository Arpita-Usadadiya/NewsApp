import React from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from 'react';



const News = (props) => {
  
  const [articles,setArticles] = useState([]);
  const [loading,setLoading] = useState(true);
  const [page,setPage] = useState(1);
  const [totalResults,setTotalResults] = useState(0);
  // document.title= `${this.capitalizeFirstLetter(
  //   props.category
  // )} - NewsApp`;


  const capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

    
  

  const updateNews = async() => {
    props.setProgress(0);
    const apiKey = 'fe942b26a8ecc0d96e3293132a253ea5';
    // GNews API uses 'q' parameter for search, using 'topic' instead of 'category'
    // For 'general' category, we'll not include topic parameter
    const baseUrl = 'https://gnews.io/api/v4/top-headlines';
    let url = `${baseUrl}?country=${props.country}&apikey=${apiKey}&page=${page}&max=${props.pageSize}`;
    
    // Add category/topic if it's not 'general'
    if (props.category !== 'general') {
      url += `&topic=${props.category}`;
    }
    
    console.log("Fetching from URL:", url); // Debug log
    
    setLoading(true);
    
    try {
      let data = await fetch(url);
      props.setProgress(30);
      
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      
      let parsedData = await data.json();
      console.log("API Response:", parsedData); // Debug log
      props.setProgress(60);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      
    } catch (error) {
      console.error("Error fetching news:", error);
      // this.setState({
      //   articles: [],
      //   loading: false,
      // });
    }
    props.setProgress(100);
  }

  useEffect(()=>{
    updateNews();

  },[])

  //async componentDidMount() {
    // let url= `https://gnews.io/api/v4/top-headlines?country=${props.country}&category=${props.category}&apikey=fe942b26a8ecc0d96e3293132a253ea5&page=1&pageSize=${props.pageSize}`;
    //  setLoading(true)
    // let data= await fetch(url);
    // let parsedData= await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });

  //   await this.updateNews();
  // }

  // async componentDidUpdate(prevProps) {
  //   if (prevProps.category !== props.category || 
  //       prevProps.country !== props.country) {
  //     await this.setState({ page: 1 });
  //     await this.updateNews();
  //   }
  // }

  const handlePreviousClick = async () => {
    // console.log("Previous");
    // let url= `https://gnews.io/api/v4/top-headlines?country=${props.country}&category=${props.category}&apikey=fe942b26a8ecc0d96e3293132a253ea5&page=${page-1}&pageSize=${props.pageSize}`;
    // setLoading(true)
    // let data= await fetch(url);
    // let parsedData= await data.json();
    // this.setState({
    //   page: page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // });
  


    console.log("Previous clicked");
    if (page > 1) {
      setPage(page-1);
      updateNews();
    }
  }

  const handleNextClick = async () => {
    // if(!(page + 1 > Math.ceil(this.state.totalResults / (props.pageSize)))) {
    //   let url= `https://gnews.io/api/v4/top-headlines?country=${props.country}&category=${props.category}&apikey=fe942b26a8ecc0d96e3293132a253ea5&page=${page-1}&pageSize=${props.pageSize}`;
    //      setLoading(true)
    //   let data= await fetch(url);
    //   let parsedData= await data.json();
    //   this.setState({
    //     page: page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   })
    // }

    console.log("Next clicked");
    const maxPages = Math.ceil(this.state.totalResults / props.pageSize);
    
    if (page < maxPages) {
      setPage(page+1);
      updateNews();
    }
  }

  const fetchMoreData = async () => {
    let url= `https://gnews.io/api/v4/top-headlines?country=${props.country}&category=${props.category}&apikey=fe942b26a8ecc0d96e3293132a253ea5&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    setLoading(true)
    let data= await fetch(url);
    let parsedData= await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    
  };

  
    // const maxPages = Math.ceil(this.state.totalResults / props.pageSize);
    // const isNextDisabled = page >= maxPages;
    // const isPreviousDisabled = page <= 1;

    return (
      <div className="container my-4 ">
        <h2 className="text-center" style={{margin: '25px 0px', marginTop: '90px'}}>
          NewsApp - Top {capitalizeFirstLetter(props.category)} Headlines
        </h2>
        
        {/* {this.state.loading && <Spinner />} */}

        {!loading && articles.length === 0 && (
          <div className="alert alert-warning text-center" role="alert">
            No articles found. Try changing your search criteria.
          </div>
        )}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles !== totalResults}
          loader={<Spinner />}
        >

        <div className="container">

        <div className="row">
          {/* {!this.state.loading &&  */}
          {articles.map((element) => {
            return (
              <div className="col-md-4 mb-4" key={element.url}>
                <Newsitem 
                  title={element.title ? element.title.slice(0, 80) : ""} 
                  description={element.description ? element.description.slice(0, 120) : ""} 
                  imageUrl={element.image}
                  newsUrl={element.url}
                  author={element.source.name || "Unknown"}
                  date={element.publishedAt}
                  source={element.source.name}
                /> 
              </div>
            );
          })}
        </div>
        </div>
        
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between my-4">
          <button 
            disabled={isPreviousDisabled} 
            type="button" 
            className="btn btn-dark" 
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          
          <span className="align-self-center">
            Page {page} of {maxPages}
          </span>
          
          <button 
            disabled={isNextDisabled} 
            type="button" 
            className="btn btn-dark" 
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  };

  
  
  News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  };
  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };
  
  export default News;