import { useState } from "react"
import { useGlobalContext } from "../context"

const Search = () => {

    const { } = useGlobalContext();
    return (
        <header className="search-container">
            <form action="">
                <input type="text" className="form-input"  placeholder="type favorite meal"/>
                <button className="btn" type="submit">search</button>
                <button className="btn btn-hipster" type="button">Surprise Me!</button>
            </form>
        </header>
    )
}

export default Search