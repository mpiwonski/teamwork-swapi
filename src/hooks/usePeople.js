import { useQuery } from "@tanstack/react-query";

async function getPeople() {
  let people = [];
  return fetch(`https://swapi.dev/api/people`)
    .then((response) => response.json())
    .then((data) => {
      const { count, results } = data;
      people = results;
      const resultsPromises = [];
      const numberOfPagesLeft = Math.ceil((count - 1) / 10);
      for (let i = 2; i <= numberOfPagesLeft; i++) {
        resultsPromises.push(fetch(`https://swapi.dev/api/people/?page=${i}`));
      }
      return Promise.all(
        resultsPromises.map(async (resultPromise) => {
          try {
            const people = await resultPromise;
            const peopleData = await people.json();
            return peopleData;
          } catch (e) {
            console.log(e);
          }
        })
      );
    })
    .then((allPeopleArray) => {
      const allPeople = allPeopleArray.reduce(
        (acc, curr) => [...acc, ...curr.results],
        people
      );
      return Promise.all(
        allPeople.map(async (person) => {
          try {
            const planetNameResponse = await fetch(person.homeworld);
            const planetNameJSON = await planetNameResponse.json();
            return {
              ...person,
              height:
                person.height === "unknown" || isNaN(person.height)
                  ? 0
                  : Number(person.height),
              mass:
                person.mass === "unknown" || isNaN(person.mass)
                  ? 0
                  : Number(person.mass),
              planetData: planetNameJSON,
            };
          } catch (e) {
            console.log(e);
          }
        })
      );
    });
}

export function usePeople() {
  const { data: people, isLoading: isGettingPeople } = useQuery({
    queryKey: ["people"],
    queryFn: getPeople,
  });

  return [people, isGettingPeople];
}
