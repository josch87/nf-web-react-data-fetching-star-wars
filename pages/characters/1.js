import Card from "../../components/Card";
import Layout from "../../components/Layout";
import useSWR from "swr";
import { useSWRConfig } from "swr";

export default function Character() {
  const id = 1;
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
    </Layout>
  );
}
