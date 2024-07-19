import "./Home.scss";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/Featured picture/Featured";
//import List from "../../components/list/List";
import axios from "axios";
import React, { useContext, useEffect, useState, Suspense } from "react";
import { Logincontext } from "../../context/usercontext";
const List = React.lazy(() => import("../../components/list/List"));
const apidata = "https://netflix-clone-without-adminpanel-api.vercel.app/list/";

const Home = (type, acesstoken) => {
  const [lists, setlist] = useState([]);
  const [genredata, setgenredata] = useState(null);
  const { user } = useContext(Logincontext);
  console.log(user?.acesstoken);
  const [genre, setgenre] = useState(null);

  const newgenre = (data) => {
    setgenredata(data);
  };

  useEffect(() => {
    setgenre(genredata);
  }, [newgenre]);

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
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type.type} genreis={newgenre} />
      {lists?.map((list, index) => (
        <Suspense fallback={<p>This Is Loading...</p>} key={index}>
          <List list={list} key={index} />
        </Suspense>
      ))}
    </div>
  );
};

export default Home;
