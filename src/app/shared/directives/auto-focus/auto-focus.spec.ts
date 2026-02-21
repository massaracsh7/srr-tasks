import { AutoFocus } from './auto-focus';

describe('Автофокус', () => {
  it('должен создавать экземпляр', () => {
    const directive = new AutoFocus();
    expect(directive).toBeTruthy();
  });
});

