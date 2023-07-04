const ShowWord = ({ word }: { word: string | undefined }) => {
  return(
    <div>
      <h1>{word}</h1>
      <h3>に決定しました！</h3>
    </div>
  );
};

export default ShowWord;