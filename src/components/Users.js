import React, { useState, useEffect } from "react";
import octokit from "../config/octokit";
import Container from "react-bootstrap/Container";
import MyCard from "./MyCard";
import parse from "parse-link-header";

function Users() {
  const [Page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [Forks, setForks] = useState([]);

  let userCards = Forks.map((fork) => {
    let { login, avatar_url, id } = fork.owner;
    return <MyCard name={login} avatar_url={avatar_url} key={id}></MyCard>;
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
      setLastPage(parse(response.headers.link).last.page);
      setForks(response.data);
    };
    getForks();
  }, [Page]);

  return (
    <Container className="mt-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 justify-content-center">
        {userCards}
      </div>
    </Container>
  );
}

export default Users;
