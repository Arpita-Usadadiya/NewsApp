import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };

  capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      totalResults: 0,
      page: 1,
    };
    document.title= `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`;
  }

  async updateNews() {
    this.props.setProgress();
    const apiKey = 'fe942b26a8ecc0d96e3293132a253ea5';
    // GNews API uses 'q' parameter for search, using 'topic' instead of 'category'
    // For 'general' category, we'll not include topic parameter
    const baseUrl = 'https://gnews.io/api/v4/top-headlines';
    let url = `${baseUrl}?country=${this.props.country}&apikey=${apiKey}&page=${this.state.page}&max=${this.props.pageSize}`;
    
    // Add category/topic if it's not 'general'
    if (this.props.category !== 'general') {
      url += `&topic=${this.props.category}`;
    }
    
    console.log("Fetching from URL:", url); // Debug log
    
    this.setState({ loading: true });
    
    try {
      let data = await fetch(url);
      this.props.setProgress(30);
      
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      
      let parsedData = await data.json();
      console.log("API Response:", parsedData); // Debug log
      this.props.setProgress(60);
      
      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalArticles || 0,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({
        articles: [],
        loading: false,
      });
    }
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // let url= `https://gnews.io/api/v4/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=fe942b26a8ecc0d96e3293132a253ea5&page=1&pageSize=${this.props.pageSize}`;
    //  this.setState({loading:true});
    // let data= await fetch(url);
    // let parsedData= await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });

    await this.updateNews();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category || 
        prevProps.country !== this.props.country) {
      await this.setState({ page: 1 });
      await this.updateNews();
    }
  }

  handlePreviousClick = async () => {
    // console.log("Previous");
    // let url= `https://gnews.io/api/v4/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=fe942b26a8ecc0d96e3293132a253ea5&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data= await fetch(url);
    // let parsedData= await data.json();
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // });


    console.log("Previous clicked");
    if (this.state.page > 1) {
      await this.setState({ page: this.state.page - 1 });
      await this.updateNews();
    }
  }

  handleNextClick = async () => {
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults / (this.props.pageSize)))) {
    //   let url= `https://gnews.io/api/v4/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=fe942b26a8ecc0d96e3293132a253ea5&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    //      this.setState({loading:true});
    //   let data= await fetch(url);
    //   let parsedData= await data.json();
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   })
    // }

    console.log("Next clicked");
    const maxPages = Math.ceil(this.state.totalResults / this.props.pageSize);
    
    if (this.state.page < maxPages) {
      await this.setState({ page: this.state.page + 1 });
      await this.updateNews();
    }
  }

  fetchMoreData = async () => {
    this.setState({page: this.state.page +1});
    let url= `https://gnews.io/api/v4/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=fe942b26a8ecc0d96e3293132a253ea5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data= await fetch(url);
    let parsedData= await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    // const maxPages = Math.ceil(this.state.totalResults / this.props.pageSize);
    // const isNextDisabled = this.state.page >= maxPages;
    // const isPreviousDisabled = this.state.page <= 1;

    return (
      <div className="container my-4">
        <h2 className="text-center" style={{margin: '35px 0px', marginTop: '90px'}}>
          NewsApp - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines
        </h2>
        
        {/* {this.state.loading && <Spinner />} */}

        {!this.state.loading && this.state.articles.length === 0 && (
          <div className="alert alert-warning text-center" role="alert">
            No articles found. Try changing your search criteria.
          </div>
        )}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles !== this.totalResults}
          loader={<Spinner />}
        >

        <div className="container">

        <div className="row">
          {/* {!this.state.loading &&  */}
          {this.state.articles.map((element) => {
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
            Page {this.state.page} of {maxPages}
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
  }
}

export default News;