import { AutoFocus } from './auto-focus';

describe('Директива AutoFocus', () => {
  it('должен создавать экземпляр', () => {
    const directive = new AutoFocus();
    expect(directive).toBeTruthy();
  });
});

