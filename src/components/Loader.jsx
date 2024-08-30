import '../styles/Loader.css';

function Loader({ onLoadComplete }) {
  function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }

  const animationDurationCount = `${getRandomIntInclusive(700, 1200)}ms`;

  return (
    <div className='loader-container d-flex__col align-items__center gap_2r justify-content__center'>
      <div
        className='loader'
        style={{ animationDuration: animationDurationCount }}
        onAnimationEnd={() => {
          onLoadComplete();
        }}
      ></div>
      <h1>Intelligent CV</h1>
    </div>
  );
}

export default Loader;
