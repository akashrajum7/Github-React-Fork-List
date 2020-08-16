import React, { useState, useEffect } from "react";
import octokit from "../config/octokit";
import Container from "react-bootstrap/Container";
import UserCard from "./UserCard";
import parse from "parse-link-header";
import Pagination from "react-js-pagination";

function Users() {
  const [Page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(984);
  const [Forks, setForks] = useState([]);

  let userCards = Forks.map((fork) => {
    let { login, avatar_url, id } = fork.owner;
    return <UserCard name={login} avatar_url={avatar_url} key={id}></UserCard>;
  });

  useEffect(() => {
    const getForks = async () => {
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/forks?page={Page}",
        {
          owner: "facebook",
          repo: "react",
          Page,
        }
      );
      let parsed = await parse(response.headers.link);
      if (parsed.hasOwnProperty("last")) {
        setLastPage(parsed.last.page);
      }
      setForks(response.data);
    };
    getForks();
  }, [Page, lastPage]);

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
}

export default Users;
