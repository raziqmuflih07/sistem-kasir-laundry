export const validateNama = (nama) => {
  return /^[a-zA-Z\s]*$/.test(nama);
};

export const validateBerat = (berat) => {
  return berat === '' || (Number(berat) >= 0 && Number(berat) <= 100);
};