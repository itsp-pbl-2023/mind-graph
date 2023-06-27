const ShowYourScore = ({ score }: { score: number | undefined }) => {
  return(
    <div>
      <h2>あなたのスコア</h2>
      <h2>{score}</h2>
    </div>
  );
};

export default ShowYourScore;
