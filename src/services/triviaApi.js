export const fetchQuestionsApi = (token) => {
  const questionsRequest = fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then((data) => data);
  return questionsRequest;
};

export const fetchTokenApi = () => {

};
