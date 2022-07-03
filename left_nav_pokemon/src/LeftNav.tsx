// @ts-ignore
import React, {
  useState,
  useEffect,
  createContext,
  Context,
  useRef,
  Fragment,
} from "react";
import "./LeftHandNav.scss";
// @ts-ignore
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
// import Pokemon from "./pokemon/Pokemon";
// @ts-ignore
import Pokemon from "pokemon/Pokemon";
// @ts-ignore
import Test from "./test/test";
import Collapsible from "react-collapsible";

function LeftNav() {
  const listInnerRef = useRef(null);
  let url = "https://pokeapi.co/api/v2/pokemon/?limit=200";
  let next = "";
  let [unfiltered, setUnfiltered] = useState<any[]>([]);
  let [searchTerm, setSearchTerm] = useState<any[]>([]);
  let [items, setItems] = useState<any[]>([]);
  let [selected, setSelected] = useState(
    window.location.pathname.includes("pokemon")
      ? window.location.pathname.split("pokemon/")[1]
      : ""
  );
  let [urlState, setUrl] = useState<any[]>([]);
  let handleScroll = async (e: any) => {
    let b =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (b) {
      console.log("scrolling");
      await fetchItems();
    }
  };

  useEffect(() => {
    if (listInnerRef.current) {
      fetchItems();
    }

    return () => {
      listInnerRef.current = false;
      if (listInnerRef.current == false) {
        setSelected("");
      }
    };
  }, [selected]);

  let fetchFromURL = async (input: string) => {
    let data = await fetch(input);
    let items = await data.json();
    setUrl(items.next);
    next = items.next;
    let results = items.results;
    return results;
  };

  let fetchItems = async () => {
    console.log("selecting pokemon");
    let urlLocal = urlState.length === 0 ? url : urlState;
    // @ts-ignore
    let these = await fetchFromURL(urlLocal);
    let nextResults = await fetchFromURL(next);
    // @ts-ignore
    let total: any[] | ((prevState: never[]) => never[]) = [];
    // @ts-ignore
    items.forEach((x) => total.push(x));
    // @ts-ignore
    these.forEach((x) => total.push(x));
    // @ts-ignore
    nextResults.forEach((x) => total.push(x));
    setItems(total);
  };

  const navigate = useNavigate();

  const getLi = (item: any, id: number) => {
    let li = (
      <div
        onClick={() => {
          setSelected(item.name);
          navigate(`pokemon/${item.name}`);
        }}
        key={id}>
        <Link
          id={item.name + "-" + id}
          to={{ pathname: "/pokemon/" + item.name }}
        >
          <li className="listItems">
            <div >{item.name}</div>
          </li>
        </Link>
      </div>
    );
    return li;
  };
  let id = 0;

  let doSearchTerm = (e: any) => {
    setSearchTerm(e.target.value);
  };
  let filter = () => {
    let toFilterBy = items;
    if (items.length < unfiltered.length) {
      setItems(unfiltered);
      toFilterBy = unfiltered;
    } else {
      setUnfiltered(items);
    }
    let filtered = toFilterBy.filter((x) => x.name.includes(searchTerm));
    setItems(filtered);
  };

  function getPokeList() {
    // @ts-ignore
    return (
      <ul onScroll={handleScroll} className="list" ref={listInnerRef}>
        <Collapsible trigger="Pokemon" className="listItems">
          <input onChange={doSearchTerm} onBlur={filter} />
        </Collapsible>
        {items.map((item) => getLi(item, ++id))}
      </ul>
    );
  }

  function getRoutes() {
    let routes = <Fragment />;
    if (selected !== "") {
      routes = (
        <Routes>
          <Route path="/pokemon/:name" element={<Pokemon name={selected} />} />
        </Routes>
      );
    } else if (window.location.pathname.includes("pokemon")) {
      const selectedPokemon = window.location.pathname.split("pokemon/")[1];
      setSelected(selectedPokemon);
      routes = (
        <Routes>
          <Route
            path="/pokemon/:name"
            element={<Pokemon name={selectedPokemon} />}
          />
        </Routes>
      );
    }

    return routes;
  }

  function getList() {
    return (
      <div
        className="dark"
        // ref={listInnerRef}
      >
        <div className="hbox">
          <div id="pokemonNav">{getPokeList()}</div>
          {getRoutes()}
        </div>
      </div>
    );
  }

  // @ts-ignore
  let div = getList();
  return div;
}
export default LeftNav;
