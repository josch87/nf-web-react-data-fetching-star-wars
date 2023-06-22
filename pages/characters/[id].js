import { useRouter } from "next/router";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import useSWR from "swr";
import Link from "next/link";
import styled from "styled-components";

const StyledBackLink = styled(Link)`
  color: var(--color-light);
  margin-top: 10px;
  padding: 5px 10px;
  text-decoration: none;
  border: 1px solid var(--color-light);
  border-radius: 10px;
`;

export default function Character() {
  const router = useRouter();
  const { id } = router.query;
  const URL = `https://swapi.dev/api/people/${id}`;
  const { data, error, isLoading } = useSWR(URL);

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Waiting for spaceship to arrive... 🛸</div>;

  return (
    <Layout>
      <Card
        id={id}
        name={data.name}
        height={data.height}
        eyeColor={data.eye_color}
        birthYear={data.birth_year}
      />
      <StyledBackLink href="/">Back</StyledBackLink>
    </Layout>
  );
}
