import React, {useState}from 'react'
import '../styles/InputSearch.css'
import { SearchBarData } from './SearchBarData';

function InputSearch() {
    const [searchInput, setSearchInput] = useState("");
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      };
      
      if (searchInput.length > 0) {
          SearchBarData.filter((i) => {
          return i.value.match(searchInput.toLocaleLowerCase);
      });
    }

    const search = document.getElementById('search');
    const results = document.getElementById('results');
    let search_term = '';

    return (
        <div className='inputSearchContainer'>
            <form class="nosubmit">
                <input class="nosubmit" type="search" 
                        placeholder="Tìm kiếm tên bài hát, nghệ sĩ, ..."
                        onChange={handleChange} value={searchInput} />
            </form>
            <ul className='searchResults'>
                {SearchBarData.map((results, index) => {
                    <li>{results.name}</li>
                })}
            </ul>
            {/* <table>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
                {SearchBarData.map((data, index) => {
                    <div>
                        <tr>
                            <td>{data.key}</td>
                            <td>{data.value}</td>
                        </tr>
                    </div>
                })}
            </table> */}
        </div>
    )
}

export default InputSearch