export async function getProducts() {
  const res = await fetch(
    "https://eu-west-2.cdn.hygraph.com/content/cm8wvbggp03gx08w2gbxlmrbs/master",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            products {
              id
              name
              price
              image {
                url
              }
            }
          }
        `,
      }),
    }
  );

  const { data } = await res.json();
  return data.products;
}
