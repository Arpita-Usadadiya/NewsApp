import React,  { Component }  from 'react'

export class Newsitem extends Component {
  
  render() {

    let {title, description, imageUrl, newsUrl, date, source } = this.props;

    return (
      <>
        <div className="card" style={{ display: "flex", justifyContent: "flex-end", width: "18rem" }}>
          <img src={!imageUrl? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE7NOCw5TXI8NQAQ6cswIYCuRVE9TtjAbggQ&s" : imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" >{source}</span>
            {/* style={{left: '92% ', zIndex: 1}} */}
            <span className="visually-hidden">unread messages</span>
            <p className="card-text">{description}...</p>
            {/* <p className="card-text"><small className="text-muted">By {!author? "unknown" : author} on {new Date(date).toGMTString()}</small></p> */}
            <p className="card-text"><small className="text-muted">Dated on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </>
    )
  }
 }

export default Newsitem;


