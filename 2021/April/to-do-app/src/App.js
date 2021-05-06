let tasks = [
  { id: "0", content: "first", isCompleted: true },
  { id: "1", content: "second", isCompleted: false },
  { id: "2", content: "third", isCompleted: false },
];
function App() {
  return (
    <div className="flex flex-jc-c flex-ai-c">
      <img
        src="/images/bg-desktop-light.jpg"
        alt="light-img"
        className="title-bar"
      />
      <div className="wrapper">
        <div className="flex flex-jc-sb flex-ai-c">
          <h1 style={{ color: "#fff" }}>T O D O</h1>
          <img
            src="/images/icon-moon.svg"
            alt="moon"
            style={{ height: "1.875em" }}
          />
        </div>
        <div className="create flex flex-ai-c">
          <div className="check"></div>
          <form>
            <input
              type="text"
              className="create-textbox"
              placeholder="Create a new todo..."
              // value={inputVal}
              // onChange={handleChange}
            />
          </form>
        </div>
        <ul style={{ height: `4em` }}>
          <li className="content flex flex-ai-c">Something</li>
        </ul>
        <div className="options flex flex-jc-sb flex-ai-c">
          <div className="task-left">0 items left</div>
          <div className="filter flex hide-for-mobile">
            <div className={``} onClick={``}>
              All
            </div>
            <div className={``} onClick={``}>
              Active
            </div>
            <div className={``} onClick={``}>
              Completed
            </div>
          </div>
          <div className="clear-completed" onClick={``}>
            Clear Completed
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
