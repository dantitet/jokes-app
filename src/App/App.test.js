import { render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from './App';
import jokeService from '../joke.service';

test('renders ready for a joke', () => {
  render(<App />);
  const linkElement = screen.getByText(/Ready for a joke/i);
  expect(linkElement).toBeInTheDocument();
});

test('fetchJoke sets jokes state with data from API', () => {
  var mock = new MockAdapter(axios);
  const dataFromAPI = {
    id: 310,
    type: 'general',
    setup: 'Who did the wizard marry?',
    punchline: 'His ghoul-friend',
  };
  mock
    .onGet('https://official-joke-api.appspot.com/random_joke')
    .reply(200, dataFromAPI);

  jokeService.fetchJoke().then((res) => {
    expect(res).toEqual(dataFromAPI);
  });
});
