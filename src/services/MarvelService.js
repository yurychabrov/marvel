
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=d7db14383d333427844a4e50816efa12'

    getResource = async (url) => {
        let res = await fetch(url)
        if (!res.ok) {
            throw new Error(`Could not fetch: ${url} status: ${res.status} `)
        }
        return await res.json()
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`) 
        return res.data.results.map( this._transformCharacter )
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCharacter(res)
    }

    _transformCharacter(char) {
        return {
            name: char.data.results[0].name,
            description: char.data.results[0].description,
            thumbnail: `${char.data.results[0].thumbnail.path}.${char.data.results[0].thumbnail.extension}`,
            homepage: char.data.results[0].urls[0].url,
            wiki: char.data.results[0].urls[1].url
        }
    }
}

export default MarvelService