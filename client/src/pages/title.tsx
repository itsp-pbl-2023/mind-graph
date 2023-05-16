const Title = () => {
    return (
      <div>
        <h1>MIND GRAPH</h1>
        <p>MINNA NO NOU WO KASHIKASURU</p>

        

        <form>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>

      
    )
  }
  
  export default Title
  