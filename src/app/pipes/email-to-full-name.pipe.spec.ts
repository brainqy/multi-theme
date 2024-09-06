import { EmailToFullNamePipe } from './email-to-full-name.pipe';

describe('EmailToFullNamePipe', () => {
  it('create an instance', () => {
    const pipe = new EmailToFullNamePipe();
    expect(pipe).toBeTruthy();
  });
});
