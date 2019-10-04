import * as React from "react";
import { Card } from "react-bootstrap";
import { ApiClientProvider } from "../../../Client";
import { Movie } from "../../../Models/Movies";
import { QueryParameters, QueryResult } from "../../../Models/Querying";
import { TvShow } from "../../../Models/TvShow";
import { ComponentSpinner } from "../../Shared/ComponentSpinner";

const apiClient = ApiClientProvider.getClient();

interface IProps {}

interface IState {
    loading: boolean;
    recentlyAddedMovies: QueryResult<Movie>;
}

export class RecentlyAddedMovies extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            recentlyAddedMovies: null,
        };
    }

    public async componentDidMount(): Promise<void> {
        this.setState({ loading: true });
        const queryParameters = new QueryParameters(
            0,
            20,
            "added",
            "Desc",
        );

        const movies = await apiClient.v1.movies.getMovies(queryParameters);
        this.setState({recentlyAddedMovies: movies, loading: false });
    }

    public render() {
        return (
            <Card
                className="recently-added"
            >
                <Card.Body>
                    <Card.Title>Recently Added Movies</Card.Title>
                    <div className="scrolling-wrapper-flexbox">
                        {this.state.recentlyAddedMovies ? (
                            this.state.recentlyAddedMovies.items.map((movie) => (
                                <Card key={movie.id}>
                                    <h2>{movie.title}</h2>
                                </Card>
                            ))
                        ) : (
                            <ComponentSpinner loading={this.state.loading}/>
                        )}
                    </div>
                </Card.Body>
                <style jsx>
                    {`
                        :global(.recently-added) {
                            width: 80vw;
                            margin: 0 auto;
                        }
                        
                        .scrolling-wrapper-flexbox {
                            display: flex;
                            flex-wrap: nowrap;
                            overflow-x: auto;
                            scrollbar-width: none;
                        }
                        
                        .scrolling-wrapper-flexbox::-webkit-scrollbar {
                            display: none;
                        }
                        
                        .scrolling-wrapper-flexbox div.card {
                            flex: 0 0 auto;
                            max-width: 200px;
                        }
                        
                        .scrolling-wrapper-flexbox .card {
                   
                        }
                    `}
                </style>
            </Card>
        );
    }
}
