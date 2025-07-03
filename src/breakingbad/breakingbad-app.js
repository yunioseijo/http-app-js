/**
 * Fetches a random quote from the Breaking Bad API and logs it to the console.
 * Returns the fetched quote object.
 *
 * @returns {Promise<Object>} The fetched quote object.
 */
const fetchQuote = async () => {
  const res = await fetch("https://api.breakingbadquotes.xyz/v1/quotes");
  const data = await res.json();
  console.log(data[0]);
  return data[0];
};

/**
 * Initializes the BreakingbadApp component within a specified HTML element.
 * This function is responsible for setting up and rendering the Breaking Bad app UI.
 *
 * @param {HTMLElement} element - The DOM element where the Breaking Bad app will be mounted.
 */

export const BreakingbadApp = async (element) => {
  element.innerHTML = "Loading... ";
  //   const quote = await fetchQuote();
  const quoteLabel = document.createElement("blockquote");
  const authLabel = document.createElement("h3");
  const nextQuoteButton = document.createElement("button");
  nextQuoteButton.innerText = "Next quote";

  const renderQuote = (data) => {
    quoteLabel.innerText = data.quote;
    authLabel.innerText = data.author;
    element.replaceChildren(quoteLabel, authLabel, nextQuoteButton);
  };
  fetchQuote()
    // .then(data => renderQuote(data));
    .then(renderQuote);

  //   nextQuoteButton.addEventListener("click", () => {
  //     fetchQuote().then(renderQuote);
  //   });
  // this the modern way
  nextQuoteButton.addEventListener("click", async () => {
    element.innerText = "Loading ....";
    const quote = await fetchQuote();
    renderQuote(quote);
  });
};
