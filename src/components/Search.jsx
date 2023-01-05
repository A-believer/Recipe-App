import { useState } from "react"
import { useGlobalContext } from "../context"

const Search = () => {
    const [text, setText] = useState("")
    
const { setSearchText } = useGlobalContext();
    const handleSubmit = (e) => {
        e.preventDefault()
        if (text) {setSearchText(text)
            setText('')
        }
    }

    const handleChange = (e) => {
        setText(e.target.value)
    }

    
    return (
        <header className="search-container">
            <form action="" onSubmit={handleSubmit}>
                <input type="text" className="form-input"  placeholder="type favorite meal" value={text} onChange={handleChange}/>
                <button className="btn" type="submit">Search</button>
                <button className="btn btn-hipster" type="button">Surprise Me!</button>
            </form>
        </header>
    )
}

export default Search