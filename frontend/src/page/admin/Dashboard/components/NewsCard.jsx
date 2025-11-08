

function NewsCard({news}){

    return(
        <div className="cards news">
            {
                news?.length > 0 ? (
                    news.map((n , i) => 
                        <div key={i} className="news-card">
                            <h4>{n?.title}</h4>
                            <button className="dlt-news">DELETE</button>
                        </div>
                    )
                ) : (
                    <p>No News Available</p>
                )
            }

        </div>
    )

}

export default NewsCard;