import "./Home.scss";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/Featured picture/Featured";
//import List from "../../components/list/List";
import axios from "axios";
import React, { useContext, useEffect, useState, Suspense } from "react";
import { Logincontext } from "../../context/usercontext";
import Useconversation from "../../components/zustand/Useconversation";
import { Oval } from "react-loader-spinner";

const List = React.lazy(() => import("../../components/list/List"));
const apidata = "https://netflix-clone-without-adminpanel-api.vercel.app/list/";

const Home = (type, acesstoken) => {
  const [lists, setlist] = useState([]);
  //const [loading, setloading] = useState(false);
  const [genredata, setgenredata] = useState(null);
  const [featuredmoviedata, setfeaturedmoviedata] = useState([]);
  const { user } = useContext(Logincontext);

  const [genre, setgenre] = useState(null);
  const { loading } = Useconversation();

  const newgenre = (data) => {
    setgenredata(data);
  };
  const newfeaturedmovie = (data) => {
    setfeaturedmoviedata(data);
  };

  useEffect(() => {
    setgenre(genredata);
  }, [newgenre, genredata]);

  useEffect(() => {
    const getrandomlists = async () => {
      try {
        const res = await axios.get(
          `${apidata}${type.type ? "?type=" + type.type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token: "bearer " + user?.acesstoken,
            },
          }
        );

        setlist(res?.data);
        console.log(user?.acesstoken);
      } catch (error) {
        console.log(`the error is: ${error}`);
      }
    };
    getrandomlists();
  }, [type, genre, user?.acesstoken]);

  return (
    <div className="home">
      {loading && (
        <div className="loader">
          <div className="loading">
            <Oval
              visible={true}
              height="300"
              width="300"
              color="white"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </div>
      )}
      <Navbar />
      <Featured
        type={type.type}
        genreis={newgenre}
        featuredmovie={newfeaturedmovie}
      />
      {lists?.map((list, index) => (
        <Suspense fallback={<p>This Is Loading...</p>} key={index}>
          <List list={list} key={index} />
        </Suspense>
      ))}
    </div>
  );
};

export default Home;
