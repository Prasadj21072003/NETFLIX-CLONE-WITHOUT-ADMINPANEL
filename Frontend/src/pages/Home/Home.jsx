import "./Home.scss";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/Featured picture/Featured";
import List from "../../components/list/List";
import axios from "axios";
import { useEffect, useState } from "react";
const apidata = "list/";

const Home = (type) => {
  const [lists, setlist] = useState([]);
  const [genredata, setgenredata] = useState(null);

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
              token:
                "bearer " + JSON.parse(localStorage.getItem("user")).acesstoken,
            },
          }
        );

        setlist(res?.data);
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
      {lists.map((list, index) => (
        <List list={list} key={index} />
      ))}
    </div>
  );
};

export default Home;
