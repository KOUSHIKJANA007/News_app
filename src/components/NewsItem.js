import React from 'react'

const NewsItem =(props)=>{
        let { title, description, imageUrl, newsUrl, author, date,source } = props;
        return (
            <div>
                <div className="card m-3">
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div style={{display:"flex",justifyContent:"flex-end",position:"absolute",right:"0"}}>
                    <span className="badge rounded-pill bg-danger">{source}</span>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title"> {title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toUTCString()} </small></p>
                        <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-primary">Read more</a>
                    </div>
                </div>
            </div>

        )
}

export default NewsItem