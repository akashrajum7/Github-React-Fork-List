import React, { useState, useEffect } from "react";
import octokit from "../config/octokit";
import Container from "react-bootstrap/Container";
import UserCard from "./UserCard";
import parse from "parse-link-header";
import Pagination from "react-js-pagination";
import Spinner from "react-bootstrap/Spinner";
import "./UserDeck.css";

function Users() {
  const [Page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [Forks, setForks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleFollow = async (name) => {
    const followResponse = await octokit.request(
      "PUT /user/following/{username}",
      {
        username: name,
      }
    );
    if (followResponse.status === 204) {
      alert(`You have followed ${name}`);
    }
    // console.log("Follow: ", name);
  };

  let userCards = Forks.map((fork) => {
    let { login, avatar_url, id } = fork.owner;
    return (
      <UserCard
        name={login}
        avatar_url={avatar_url}
        handleFollow={handleFollow}
        key={id}
      ></UserCard>
    );
  });

  useEffect(() => {
    const getForks = async () => {
      setIsLoading(true);
      const forkResponse = await octokit.request(
        "GET /repos/{owner}/{repo}/forks?page={Page}",
        {
          owner: "facebook",
          repo: "react",
          Page,
        }
      );
      let parsed = await parse(forkResponse.headers.link);
      if (parsed.hasOwnProperty("last")) {
        setLastPage(parsed.last.page);
      }

      const newForks = forkResponse.data;

      setForks(newForks);
      setIsLoading(false);
    };
    getForks();
  }, [Page, lastPage]);

  if (!isLoading) {
    return (
      <Container className="mt-4">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 justify-content-center">
          {userCards}
        </div>
        <Pagination
          activePage={Page}
          itemsCountPerPage={30}
          totalItemsCount={30 * lastPage}
          pageRangeDisplayed={5}
          itemClass="page-item"
          linkClass="page-link"
          onChange={(pageNumber) => {
            setPage(pageNumber);
          }}
        />
      </Container>
    );
  } else {
    return (
      <Container>
        <div className="row justify-content-center loading-cont">
          <Spinner animation="grow" />
        </div>
      </Container>
    );
  }
}

export default Users;
