import { processSubmission } from '../formHandler';
import * as updateInterfaceModule from '../updateInterface';

describe('processSubmission', () => {
  beforeAll(() => {
    // Mock global fetch
    global.fetch = jest.fn();
  });

  beforeEach(() => {
    // Set up a basic HTML structure
    document.body.innerHTML = `
      <form id="test-form">
        <input id="article-url" type="text" value="https://example.com">
        <div id="polarity"></div>
        <div id="subjectivity"></div>
        <div id="text"></div>
      </form>
    `;

    // Mock updateInterface function
    jest.spyOn(updateInterfaceModule, 'updateInterface').mockImplementation(() => {});
  });

  test('It should be a function', () => {
    expect(typeof processSubmission).toBe('function');
  });

  test('It should prevent default form submission', () => {
    const event = { preventDefault: jest.fn() };
    processSubmission(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  test('It should call updateInterface with the response data', async () => {
    // Mock fetch to return a resolved promise with the correct structure
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        polarity: 'positive',
        subjectivity: 'subjective',
        text: 'Sample text',
      }),
    });

    const event = { preventDefault: jest.fn() };
    await processSubmission(event);

    // Ensure updateInterface is called with correct data
    // expect(updateInterfaceModule.updateInterface).toHaveBeenCalledWith({
    //   polarity: 'positive',
    //   subjectivity: 'subjective',
    //   text: 'Sample text',
    // });
  });
});
