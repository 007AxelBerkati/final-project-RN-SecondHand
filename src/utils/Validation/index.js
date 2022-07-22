import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Email Tidak Valid').required('Diperlukan').trim(),
  password: Yup
    .string()
    .required('Tolong Masukan Password Anda')
    .trim(),
});

export const signupSchema = Yup.object().shape({
  full_name: Yup.string()
    .min(2, 'Nama terlalu pendek')
    .max(50, 'Nama terlalu panjang')
    .trim()
    .required('Diperlukan'),
  email: Yup.string().email('Email Tidak Valid').required('Diperlukan'),
  password: Yup
    .string()
    .required('Tolong Masukan Password Anda')
    .min(8, 'Password terlalu pendek')
    .matches(/^(?=.*[a-z])/, 'Harus berisi minimal satu huruf kecil')
    .matches(/^(?=.*[A-Z])/, 'Harus berisi minimal satu huruf besar')
    .matches(/^(?=.*[\d])/, 'Harus berisi minimal satu angka')
    .trim(),
  address: Yup.string()
    .min(4, 'Alamat terlalu pendek')
    .max(50, 'Alamat terlalu panjang')
    .trim()
    .required('Diperlukan'),
  phone_number: Yup.string()
    .trim()
    .min(9, 'No Hp Terlalu Pendek')
    .max(11, 'No Hp Terlalu Panjang')
    .required('Silahkan Isi Nomor Handphone Anda'),
  city: Yup.string().required('Diperlukan'),
});

export const updateProfileSchema = Yup.object().shape({
  full_name: Yup.string()
    .min(2, 'Nama Terlalu Pendek')
    .max(50, 'Nama Terlalu Panjang')
    .trim()
    .required('Diperlukan'),
  city: Yup.string()
    .required('Diperlukan'),
  address: Yup.string()
    .min(2, 'Alamat terlalu pendek')
    .max(100, 'Alamat terlalu panjang')
    .required('Diperlukan')
    .trim(),
  phone_number: Yup.string()
    .trim()
    .min(9, 'No Hp Terlalu Pendek')
    .max(11, 'No Hp Terlalu Panjang')
    .required('Silahkan Isi Nomor Handphone Anda'),
});

export const TambahDataSchema = Yup.object().shape({
  namaProduk: Yup.string()
    .trim()
    .required('Silahkan Isi Nama Produk'),
  hargaProduk: Yup.string()
    .trim()
    .required('Silahkan Isi Harga Produk'),
  kategori_id: Yup
    .array()
    .min(1, 'Kategori minimal satu')
    .required('Silahkan Isi Kategori Produk'),
  deskripsi: Yup.string().required('Silahkan Isi Deskripsi Produk'),
  image: Yup.object().required('Silahkan Isi Gambar Produk'),
});
export const UpdateDataSchema = Yup.object().shape({
  namaProduk: Yup.string()
    .trim()
    .required('Silahkan Isi Nama Produk'),
  hargaProduk: Yup.string()
    .trim()
    .required('Silahkan Isi Harga Produk'),
  kategori_id: Yup
    .array()
    .min(1, 'Kategori minimal satu')
    .required('Silahkan Isi Kategori Produk'),
  deskripsi: Yup.string().required('Silahkan Isi Deskripsi Produk'),
});

export const gantiPassSchema = Yup.object().shape({
  current_password: Yup
    .string()
    .required('Tolong Masukan Password Anda')
    .trim(),
  new_password: Yup
    .string()
    .required('Tolong Masukan Password Anda')
    .min(8, 'Password terlalu pendek')
    .matches(/^(?=.*[a-z])/, 'Harus berisi minimal satu huruf kecil')
    .matches(/^(?=.*[A-Z])/, 'Harus berisi minimal satu huruf besar')
    .matches(/^(?=.*[\d])/, 'Harus berisi minimal satu angka')
    .trim(),
  confirm_password: Yup
    .string()
    .required('Tolong Masukan Password Anda')
    .min(8, 'Password terlalu pendek')
    .matches(/^(?=.*[a-z])/, 'Harus berisi minimal satu huruf kecil')
    .matches(/^(?=.*[A-Z])/, 'Harus berisi minimal satu huruf besar')
    .matches(/^(?=.*[\d])/, 'Harus berisi minimal satu angka')
    .trim(),
});

export const bidPriceSchema = Yup.object().shape({
  bid_price: Yup.number()
    .typeError('Isi dalam bentuk angka')
    .required('Silahkan Isi Harga Bid'),
});
