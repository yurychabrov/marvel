import { Component } from 'react/cjs/react.development';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner'; 
import ErrorMessage from '../errorMessages/ErrorMessage';

class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.updateChar()
    }

    onCharLoaded = (char) => {
        this.setState( {
            char, 
            loading: false
        } )
    }

    onError = () => {
        this.setState( {
            loading: false,
            error: true
        } )
    }
    
    updateChar = () => {
        const id = Math.floor( Math.random() * (1011400 - 1011000) + 1011000 )
        this.marvelService.getCharacter(id)
                          .then( this.onCharLoaded )
                          .catch( this.onError )
    }
    

    render() {
        const { char, loading, error } = this.state 
  
        const errorMessage = error ? <ErrorMessage /> : null
        const spinner = loading ? <Spinner /> : null 
        const content = !(errorMessage || spinner) ? <View char={char} /> : null

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner"
                             onClick={this.updateChar}
                        >try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
    
}

const View = ({char}) => {
    const {name, thumbnail, description, homepage, wiki} = char 

    let desc
    if (description) {
        desc = (description.length > 120) ? description.substring(0, 120) + '...' : description
    } else 
        desc = 'Описание по данному персонажу отсутствует'

    return (
                <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            { desc }
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
    )
}

export default RandomChar;