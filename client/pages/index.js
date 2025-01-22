import axios from "axios";
const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  axios.get("https://ticketing.dev/api/users/currentuser").catch((err) => {
    console.log(err.message);
  });

  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = () => {
  return { color: "red" };
};

export default LandingPage;
