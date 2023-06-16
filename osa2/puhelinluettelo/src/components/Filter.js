const Filter = ({searchInput, handleSearch}) => {
    return (
      <form>
        <div>
          filter shown with: <input 
          value={searchInput}
          onChange={handleSearch}
          />
        </div>
      </form>
    )
}

export default Filter