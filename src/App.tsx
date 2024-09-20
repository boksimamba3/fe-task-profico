import './App.scss'
import Icon from './ui/icons'

function App() {

  return (
    <>
        <div className="topbar">
            <div className="container">
                <div className="topbar__inner">
                    <p className="topbar__callout">Make MyNews your homepage</p>
                    <p className="topbar__info">Every day discover what's trending on the internet!</p>
                    <div className="topbar__actions">
                        <button className="topbar__ignore">No, thanks</button>
                        <button className="topbar__confirm">Get</button>
                    </div>
                </div>
            </div>
        </div>


        <div className="container">
            <header className="header">
                <div>
                    <h1 className="title"><span className="title--red">My</span>News</h1>
                </div>

                <div className="search-box">
                    <Icon.Search className="search-box__icon"/>
                    <input className="search-box__input" type="text" placeholder="Search News" />
                    <button className="search-box__button">Search</button>
                </div>

                <div className="mobile-navigation"></div>
            </header>

            <div className="divider"></div>

            <div className="content">
                <nav className="navigation">
                    <ul className="navigation__list">
                        <li className="navigation__item">
                            <a className="navigation__link navigation__link--active" href="#">
                                <Icon.Home />
                                <span>Home</span>
                            </a>
                        </li>
                        <li className="navigation__item">
                            <a className="navigation__link" href="#">
                                <Icon.News />
                                <span>News</span>
                            </a>
                        </li>
                        <li className="navigation__item">
                            <a className="navigation__link" href="#">
                                <Icon.Business />
                                <span>Business</span>
                            </a>
                        </li>
                        <li className="navigation__item">
                            <a className="navigation__link" href="#">
                                <Icon.Health />
                                <span>Health</span>
                            </a>
                        </li>
                        <li className="navigation__item">
                            <a className="navigation__link" href="#">
                                <Icon.Science />
                                <span>Science</span>
                            </a>
                        </li>
                        <li className="navigation__item">
                            <a className="navigation__link" href="#">
                                <Icon.Sports />
                                <span>Sports</span>
                            </a>
                        </li>
                        <li className="navigation__item">
                            <a className="navigation__link" href="#">
                                <Icon.Technology />
                                <span>Technology</span>
                            </a>
                        </li>
                    </ul>
                </nav>

                <main className="news">
                    <h2 className="news__category">News</h2>
                    <div className="news__layout">
                        <div className="latest-news">
                            <div className="latest-news__header">
                                <Icon.FlashingCircle className="latest-news__indicator" />
                                <h2 className="latest-news__title">Latest news</h2>
                            </div>
                            <div className="latest-news__body">
                                {Array.from({ length: 40 }).map((_, index) => (
                                    <div key={index} className="latest-news__article">
                                        <span>14:30</span>
                                        <p>6 Powerful Tips To Creating Testimonials That Sell Your Products</p>
                                    </div>
                                ))}
                            </div>
                            <div className="latest-news__footer">
                                <a href="#">See All News</a>
                            </div>
                        </div>
                        {
                            Array.from({ length: 10 }).map((_, index) => (
                                <div key={index} className="article">
                                    <div className="article__image">
                                        <img src="https://ip.index.hr/remote/bucket.index.hr/b/index/9da1b2ef-dd33-4855-9093-0586b4f7ea4c.jpg?width=765&height=402" alt="Article Image" />
                                    </div>
                                    <div className="article__content">
                                        <div>
                                            <span className="article__category">Category</span>
                                            <h3 className="article__title">News Title</h3>
                                        </div>
                                        <div className="article__author">
                                            <p>John Doe</p>
                                        </div>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                </main>
            </div>
        </div>
    </>
  )
}

export default App
