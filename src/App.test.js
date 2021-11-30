import { render, screen } from '@testing-library/react';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';

/*test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/


describe('App component shallow renders', () => {
  it('redners without crashing', () => {
    shallow(<App />);
  })

  it('Full App component render without crashing', () => {
    mount(
      <Provider store={store}>
        <App />
      </Provider>
    )
  })
})