export async function getProducts() {
  try {
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
                description
                image {
                  url
                }
              }
            }
          `,
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const { data } = await res.json();
    return data.products;
  } catch (error) {
    console.error("failed to fetch data", error);
    return [];
  }
}
