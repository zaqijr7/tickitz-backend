
exports.checkForm = (data) => {
  const a = Object.values(data).filter((items) => items === '')
  if (a[0] === '') {
    return 'DATA TIDAK BOLEH KOSONG'
  }
}
