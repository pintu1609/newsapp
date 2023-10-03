import React  from 'react'

const NewsItem =(props)=> {
   
  
    let {title, description, imageurl, newsUrl, author, date, source}= props;
    return (
      <div className="my-3">
        <div className="card" style={{}}>
          <div style={{display:'flex', justifyContent:'flex-end', position:'absolute',right:0 }}>
        <span className="badge rounded-pill bg-danger" >
                 {source}
                
                </span>
                </div>
            <img src={!imageurl?"https://fdn.gsmarena.com/imgroot/news/23/07/threads-launching-jul-6/-952x498w6/gsmarena_00.jpg":imageurl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title} </h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toGMTString()} </small></p>
                <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  
}

export default NewsItem
