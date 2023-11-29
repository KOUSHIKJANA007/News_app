import React, { useState,useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10);
        const urls = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.catagory}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(urls);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }
    useEffect(() => {
        updateNews();
        document.title = `${capitalizeFirstLetter(props.catagory)} - NewsMonkey`
        //eslint-disable-next-line
    }, [])


    // // async componentDidMount() {
    // //     let urls = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.catagory}&apiKey=e33f322b060b4ea7bbd2130ba7338a7a&page=1&pageSize=${props.pageSize}`;
    // //     this.setState({loading:true})
    // //     let data = await fetch(urls);
    // //     let parsedData = await data.json();
    // //     this.setState({ articles: parsedData.articles, 
    // //         totalResults: parsedData.totalResults,
    // //         loading:false 
    // //     });
    // //     this.updateNews();
    // // }
    // const handlePrevButton = async () => {
    //     // let urls = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.catagory}&apiKey=e33f322b060b4ea7bbd2130ba7338a7a&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
    //     // this.setState({loading:true})
    //     // let data = await fetch(urls);
    //     // let parsedData = await data.json();
    //     // this.setState({
    //     //     page: this.state.page - 1,
    //     //     articles: parsedData.articles,
    //     //     loading:false
    //     // });
    //     // setState({ page: this.state.page - 1 })
    //     setPage(page - 1)
    //     updateNews()
    // }
    // const handleNextButton = async () => {
    //     // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize))) {
    //     //     let urls = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.catagory}&apiKey=e33f322b060b4ea7bbd2130ba7338a7a&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    //     //     this.setState({loading:true})
    //     //     let data = await fetch(urls);
    //     //     let parsedData = await data.json();
    //     //     this.setState({
    //     //         page: this.state.page + 1,
    //     //         articles: parsedData.articles,
    //     //         loading:false
    //     //     });
    //     // }
    //     // this.setState({ page: this.state.page + 1 })
    //     // this.updateNews()
    //     setPage(page + 1)
    //     updateNews()
    // }
    const fetchMoreData = async () => {
        // this.setState({ page: this.state.page + 1 })
        const urls = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.catagory}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(urls);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }

        return (
            <>
                <h1 style={{marginTop:"90px"}} className='text-center'>NewsMonkey - Top Headlines from {capitalizeFirstLetter(props.catagory)} </h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4 p-1" key={element.url} >
                                    <NewsItem title={element.title} description={element.description}
                                        imageUrl={element.urlToImage ? element.urlToImage : "https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_583,w_1036,x_0,y_0/dpr_2.0/c_limit,w_740/fl_lossy,q_auto/v1700216831/F_HaJrFXMAA-2RO_qbsqfi"}
                                        newsUrl={element.url} author={element.author ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container m-5 d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevButton} className="btn btn-dark">&larr;Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" onClick={this.handleNextButton} className="btn btn-dark">Next&rarr;</button>
                </div> */}
            </>

        )
}

News.defaultPropes = {
    country: "in",
    pageSize: 5,
    catagory: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    catagory: PropTypes.string
}


export default News