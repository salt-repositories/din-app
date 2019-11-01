import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Card, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { ComponentsActions } from "../../../Store/Components/actions";
import { MovieActions } from "../../../Store/Movie/actions";
import { RecentlyAddedMoviesProvider } from "../../../Store/Providers/RecentlyAddedMoviesProvider";
import { IInitialState } from "../../../Store/states";
import { ComponentSpinner } from "../../Shared/ComponentSpinner";
import { YoutubeModal } from "../../Shared/YoutubeModal";

library.add(fab);

interface IState {
    loading: boolean;
    showYoutube: boolean;
    trailerId: string;
}

const mapDispatchToProps = ({
    setRecentlyAddedMovies: MovieActions.setRecentlyAddedMovies,
    setShowYoutubeModal: ComponentsActions.setShowYoutubeModal,
});

const mapStateToProps = (state: IInitialState) => ({
    recentlyAddedMovies: state.movie.recentlyAddedMovies,
    showYoutubeModal: state.components.showYoutubeModal,
});

type Props = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps;

class RecentlyAddedMovies extends React.Component<Props, IState> {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            showYoutube: false,
            trailerId: null,
        };
    }

    public async componentDidMount(): Promise<void> {
        this.setState({loading: true});
        await RecentlyAddedMoviesProvider(this.props.recentlyAddedMovies, this.props.setRecentlyAddedMovies);
        this.setState({loading: false});
    }

    public render() {
        return (
            <Card
                className="recently-added"
            >
                <YoutubeModal show={this.props.showYoutubeModal} trailerId={this.state.trailerId} />
                <Card.Body>
                    <Card.Title>Recently Added Movies</Card.Title>
                    <div className="horizontal-container">
                        <Row>
                            {this.props.recentlyAddedMovies ? (
                                this.props.recentlyAddedMovies.map((item) => (
                                    <Card key={item[0].id} className="container-item">
                                        <Card.Img src={`https://image.tmdb.org/t/p/w500/${item[1].posterPath}`}/>
                                        <Card.Body>
                                            <Card.Title>{item[0].title}</Card.Title>
                                            <Card.Text>{item[0].year}</Card.Text>
                                            <span
                                                className="trailer-link"
                                                onClick={() => this.openYoutubeModal(item[0].youtubeTrailerId)}
                                            >
                                                <Youtube
                                                    className="logo"
                                                />
                                                Trailer
                                            </span>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <ComponentSpinner loading={this.state.loading}/>
                            )}
                        </Row>
                    </div>
                </Card.Body>
                <style jsx>
                    {`
                        :global(.recently-added) {
                            border-radius: 5px;
                            width: 90vw;
                            height: 400px;
                            background: #2b2b2ba8;
                            margin: 5vh auto auto 8vw;
                        }
                        
                        :global(.recently-added > .card-body > .card-title) {
                            font-size: 25px;
                            color: #ff8d1c;
                            text-shadow: 1px 1px 1px #000;
                            width: 95%;
                            margin: 0 auto;
                        }
                        
                        :global(.horizontal-container) {
                            margin: 0 auto;
                            width: 95%;
                            height: 100%;
                        }
                        
                        :global(.horizontal-container > .row) {
                            flex-wrap: nowrap;
                            height: 100%;
                            overflow-x: auto;
                            scrollbar-width: none;
                            white-space: nowrap;
                            margin-left: 0;
                            margin-right: 0;
                            white-space: unset;
                        }
                        
                        .horizontal-container::-webkit-scrollbar {
                            display: none;
                        }
                        
                        :global(.horizontal-container > .row > .container-item) {
                            background: transparent;
                            min-width: 130px;
                            margin: 10px;
                            border: none;
                            overflow: hidden;
                        }
                        
                        :global(.container-item > .card-img) {
                            height: 185px;
                        }
                        
                        :global(.container-item > .card-body) {
                            padding: 10px 0 0 0;
                        }
                        
                        :global(.container-item > .card-body > .card-title) {
                            height: 28px;
                            color: #fff;
                            overflow-wrap: break-word;
                            word-wrap: break-word;
                            hyphens: auto;
                            font-size: 15px;
                        }
                        
                        :global(.container-item > .card-body > .card-text) {
                            color: #9d7751;
                            margin-bottom: 0;
                        }
                        
                        :global(.container-item .trailer-link) {
                            color: #dbd6ce;
                            font-size: 12px;
                        }
                        
                        :global(.container-item .trailer-link:hover) {
                            cursor: pointer
                        }
                        
                        :global(.container-item .trailer-link .logo) {
                            width: 20px;
                            color: #df1818;
                            margin-right: 5px;
                        }
                    `}
                </style>
            </Card>
        );
    }

    private openYoutubeModal(trailerId: string) {
        this.setState({
            trailerId,
        });

        this.props.setShowYoutubeModal(true);
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RecentlyAddedMovies);
