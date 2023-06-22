import styled from "styled-components";
import Link from "next/link";
import Layout from "../components/Layout";
import useSWR from "swr";

export default function HomePage() {
  const URL = `https://swapi.dev/api/people/`;
  const { data, error, isLoading } = useSWR(URL);
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Waiting for characters to be created... 🎭</div>;

  const characters = data.results;

  return (
    <Layout>
      <h1>React Data Fetching: Star Wars</h1>
      <p>Found {data.count} characters</p>
      <List>
        {characters.map((character) => {
          const regex = /\/(\d+)\/$/;
          const match = character.url.match(regex);
          const id = match ? match[1] : null;
          return (
            <li key={id}>
              <StyledLink href={`/characters/${id}`}>
                {character.name}
              </StyledLink>
            </li>
          );
        })}
      </List>
    </Layout>
  );
}

const List = styled.ul`
  background-color: var(--color-light);
  list-style-type: "➡️ ";
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 5px;
  text-decoration: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--color-dark);
`;
