import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News=(props)=> {
 
  const[articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResult, setTotalResult] = useState(0)
  
  
  
  const capitalizeFirstLetter =(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

    
      
    const updatenews=async()=>{

      props.setProgress(10);

      const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      // this.setState({loading:true})
      setLoading(true);
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData= await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles)
      setTotalResult(parsedData.totalResults)
      setLoading(false)
      

      props.setProgress(100);

    }

    useEffect(() => {
      document.title=`${capitalizeFirstLetter(props.category)} - NewsMonkey`
      updatenews();
    
      
    }, [])
    


const handlePreClick=async()=>{
    // console.log("previous")

    // let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8d3cb09bc6d24f48b4a828b56f075317&page=${this.state.page -1}&pageSize=${props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parseData= await data.json();
    // this.setState({
    //     articles: parseData.articles,
    //     page:this.state.page -1,
    //     loading:false
    // })

    
    // this.setState({page: this.state.page-1})
    setPage(page-1)
    updatenews();

}
 const handleNextClick=async ()=>{
    console.log("next")
    // if(!(this.state.page +1> Math.ceil(this.state.totalResult/props.pageSize))){

    

    //     let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8d3cb09bc6d24f48b4a828b56f075317&page=${this.state.page +1}&pageSize=${props.pageSize}`;
    //     this.setState({loading:true})
    //     let data = await fetch(url);
    //     let parseData= await data.json();
        
    //        this.setState({
    //           articles: parseData.articles,
    //           page:this.state.page +1,
    //           loading:false
    //         })
    // }

    
    // 
    // this.setState({page: this.state.page+1});

    setPage(page+1)
    updatenews();
  }

 const fetchMoreData =async() => {
    
  
 
      const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      // this.setState({loading:true})
      setPage(page+1)
      let data = await fetch(url);
      let parseData= await data.json();
     setArticles(articles.concat(parseData.articles))
     setTotalResult(parseData.totalResults)
    //  setLoading(false)
     
  };

 
    
    return (
       
      // <div className='container my-3'>
      <>
        <h2 className='text-center' style={{marginTop:90}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines </h2>
        {loading && <Spiner/>}
        
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==totalResult }
          loader={<Spiner/>}
        >
         <div className="container">

            
        <div className="row">
        {
        // !this.state.loading && 
        articles.map((element)=>{

           return <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title?element.title:""} description={element.description?element.description.slice(0, 88 ):""} 
            imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
        })}
            
            </div>  
        </div>
        </InfiniteScroll>
        
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreClick}>&larr; Previous</button>
        <button disabled={this.state.page +1> Math.ceil(this.state.totalResult/props.pageSize )} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}

      {/* </div> */}
      </>
    )
  
}
 News.defaultProps = {
  country:'in',
  pageSize:8,
  category:'general'

}

 News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
}

export default News
