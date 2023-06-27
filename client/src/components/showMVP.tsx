const ShowMVP = ({ userID }: { userID: string | undefined }) => {
  return(
    <div>
      <h2>本日のMVPは...</h2>
      <h2>{userID}</h2>
    </div>
  );
};

export default ShowMVP;
