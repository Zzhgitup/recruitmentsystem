const fakeAuprovider = {
  isAuthentivcate: false,
  singIn(callback: any) {
    fakeAuprovider.isAuthentivcate = true;
    setTimeout(callback, 1000);
  },
  singout(callback: any) {
    fakeAuprovider.isAuthentivcate = false;
    setTimeout(callback, 1000);
  }
};
export default fakeAuprovider;
